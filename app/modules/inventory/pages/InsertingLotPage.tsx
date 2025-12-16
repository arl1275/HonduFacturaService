import styles from "@/assets/styles/styles";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Pressable } from "react-native";
import { StackParamList } from "../indexInventory";
import { StackScreenProps } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import PreparationLot from "../utils/preparateInsertLot";
import { InsertLot } from "@/storage/modals/insertlot_modal";
import { supplier } from "@/storage/modals/supplier";
import { PickerSupplier } from "@/components/Pickers";
import { product } from "@/storage/modals/inventory";
import { getCompany_by_ID } from "@/storage/company.storage";

import ProductPicker from "../components/productspicker";
import { company } from "@/storage/modals/empresa";

type props = StackScreenProps<StackParamList, "InsertingLotPage">;

const InsertingLotPage = ({ route, navigation }: props) => {
    // Renombrado para consistencia
    const [insertingLotDraft, setInsertingLotDraft] = useState<InsertLot | undefined>(undefined);
    const [supplierSelected, setSupplierSelected] = useState<supplier | undefined>(undefined);
    const [prodSelectedList, setProdSelectedList] = useState<product[]>([]);

    // Nuevo estado para almacenar el porcentaje de impuesto activo (ej. 0.15 para 15%)
    const [taxRate, setTaxRate] = useState<number>(0);

    const [results, setResults] = useState<undefined | any>({
        total: 0.0,
        subtotal: 0.0,
        taxAmount: 0.0, // Añadido para mejor claridad
        qty: 0.0
    });

    const onSelectSupplier = (selected: supplier | undefined) => { setSupplierSelected(selected) };
    const existLot = () => { return insertingLotDraft === undefined ? false : true };

    // Lógica de Cálculo Corregida
    const calculateValues = () => {
        // 1. Obtener el porcentaje de impuesto
        let companyData: company | undefined = route.params.invo != undefined ? getCompany_by_ID(route.params.invo.id_company) : undefined;
        // Asumiendo que TaxApplied es el porcentaje (ej. 15), lo convertimos a ratio (ej. 0.15)
        const TaxApplied = companyData?.impuestos.find((e) => e.defaultTax === true)?.porcentaje ?? 0;
        const TaxRatio = TaxApplied / 100;
        setTaxRate(TaxRatio);

        // 2. Calcular el Subtotal (Total Base antes de impuestos)
        const subtotalBase = prodSelectedList.reduce((sum, prd) => sum + (prd.price * prd.amountStock), 0);

        // 3. Calcular el Impuesto
        const taxAmount = subtotalBase * TaxRatio;

        // 4. Calcular el Total Final
        const totalFinal = subtotalBase + taxAmount;

        setResults({
            total: totalFinal,
            subtotal: subtotalBase,
            taxAmount: taxAmount,
            qty: prodSelectedList.reduce((sum, prd) => sum + prd.amountStock, 0),
        });
    }

    const onCancel = () => {
        Alert.alert("Cancel Insert Lot", "Are you sure you want to cancel the insert lot?", [
            {
                text: 'YES',
                onPress: () => {
                    setInsertingLotDraft(undefined);
                    setResults({
                        total: 0.0,
                        subtotal: 0.0,
                        taxAmount: 0.0, 
                        qty: 0.0
                    });
                    route.params.invo && navigation.navigate("InsertingLot", { invo: route.params.invo })
                }
            },
            { text: "NO" }
        ])
    }

    // Esta función prepara el borrador del Lote
    const prepareDraft = () => {
        if (typeof route.params.invo === "object") {
            const Result = PreparationLot(route.params.invo, "Inserter", 0, route.params.invo?.id)
            setInsertingLotDraft(Result);
        }
    };

    // Función para añadir productos al lote (usada por ProductPicker)
    const addProductInInsertingLot = (newVal: product[]) => { setProdSelectedList(newVal) }

    // Función de actualización de campos individuales (Corregida la mutación de array)
    const updateInsertingLot = (field: string, value: supplier | product[] | string | number) => {
        if (insertingLotDraft != undefined) {
            setInsertingLotDraft(prev => (prev ? {
                ...prev,
                [field]: value, // Corregido: Sin corchetes [value]
                total: results.total,
                subtotal: results.subtotal
            } as InsertLot : prev))
        }
    }

    // ----------------------------------------------------
    // EFECTOS DE SINCRONIZACIÓN
    // ----------------------------------------------------

    // 1. Preparar borrador al cargar
    useEffect(() => {
        prepareDraft();
    }, [route.params.invo]);

    // 2. Sincronizar Proveedor (Supplier) con el Borrador
    useEffect(() => {
        updateInsertingLot("id_supplier", supplierSelected != undefined ? supplierSelected.id : 0);
    }, [supplierSelected?.id]);

    // 3. Sincronizar Lista de Productos -> Calcular Totales
    useEffect(() => {
        calculateValues();
    }, [prodSelectedList]);

    // 4. Sincronizar Resultados de Cálculo -> Actualizar el Borrador (CRÍTICO)
    useEffect(() => {
        if (insertingLotDraft !== undefined) {
            setInsertingLotDraft(prev => (prev ? {
                ...prev,
                total: results.total,
                subtotal: results.subtotal,
                // Si quieres guardar el impuesto en el borrador, añádelo aquí
            } as InsertLot : prev));
        }
    }, [results.total, results.subtotal]);


    return (
        <View style={[{ flex: 1 }]}>
            {/*--------------------- HEADER -------------------------*/}
            <View style={[styles.flexcomponentsRow, { margin: 5, alignItems: "center" }]}>
                <TouchableOpacity onPress={() => onCancel()}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={[styles.paragraph, styles.textalingleft, { color: "black" }]}>Inserting Lot Page</Text>
            </View>
            {/*------------------------------------------------------*/}

            <View>
                <View style={[styles.cardborder, { margin: 10, padding: 15, backgroundColor: 'white' }]}>
                    <Text style={[styles.paragraph, { color: 'black', margin: 0, fontWeight: 'bold' }]}>Insert Lot: {existLot() ? insertingLotDraft?.insert_lot_num : "Waiting Number"}</Text>
                    <Text style={[styles.paragraph, { color: 'grey', margin: 0 }]}>Date: {existLot() ? insertingLotDraft?.created_at.toString() : "Waiting Response"}</Text>
                    <Text style={[styles.paragraph, { color: 'grey', margin: 0 }]}>Warehouse: {route.params.invo?.name}</Text>
                    <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between' }]}>
                        <View style={[styles.textinput, styles.cardborder, { width: '40%' }]}>
                            <TextInput style={[styles.smallText, {}]} placeholder="Insert Inserter" />
                        </View>
                        <View style={[{ width: '50%' }]}>
                            <PickerSupplier SelectSup={onSelectSupplier} />
                        </View>
                    </View>
                </View>

                <View style={[{ margin: 10 }]}>
                    <ProductPicker onSaveList={addProductInInsertingLot} />
                </View>

            </View>

            <View style={[{ justifyContent: 'space-between', bottom: 0, position: "absolute", width: '95%', alignSelf: 'center' }]}>

                <View style={[styles.cardborder, { margin: 10, width: '95%', height: 'auto', alignSelf: 'center', padding: 10 }]}>

                    {/* Fila de Sub Total */}
                    <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.smallText, { fontWeight: 'bold' }]}>Sub Total</Text>
                        <Text style={[styles.smallText]}>
                            {results.subtotal.toFixed(2) ?? '0.00'}
                        </Text>
                    </View>

                    {/* Fila de Impuesto */}
                    <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between' }]}>
                        <Text style={[styles.smallText, { fontWeight: 'bold' }]}>Impuesto ({(taxRate * 100).toFixed(0)}%)</Text>
                        <Text style={[styles.smallText]}>
                            {results.taxAmount.toFixed(2) ?? '0.00'}
                        </Text>
                    </View>

                    {/* Fila de Total Final */}
                    <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#ccc', paddingTop: 5, marginTop: 5 }]}>
                        <Text style={[styles.paragraph, { fontWeight: 'bold', color: 'black' }]}>Total Final</Text>
                        <Text style={[styles.paragraph, { fontWeight: 'bold', color: 'black' }]}>
                            {results.total.toFixed(2) ?? '0.00'}
                        </Text>
                    </View>
                </View>

                <View style={[styles.flexcomponentsRow, { justifyContent: 'space-between', marginHorizontal: 10 }]}>
                    <Pressable style={[styles.rectanglebutton, { width: "30%", backgroundColor: 'green' }]}><Text style={[{ color: 'white', fontWeight: 'bold' }]}>CONFIRM</Text></Pressable>
                    <Pressable style={[styles.rectanglebutton, { width: "30%", backgroundColor: 'black' }]}><Text style={[{ color: 'white', fontWeight: 'bold' }]}>SAVE</Text></Pressable>
                    <Pressable style={[styles.rectanglebutton, { width: "30%", backgroundColor: 'red' }]} onPress={() => onCancel()}><Text style={[{ color: 'white', fontWeight: 'bold' }]}>CANCEL</Text></Pressable>
                </View>

            </View>

        </View>
    )
}

export default InsertingLotPage;