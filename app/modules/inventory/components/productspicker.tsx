import { product } from "@/storage/modals/inventory";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import styles from "@/assets/styles/styles";
import { useEffect, useState } from "react";

type Props = {
  products_of_this_wh: product[];
  onSelected: (value: product) => void;
};

const ProductPicker = ({ products_of_this_wh, onSelected }: Props) => {
  const [openProducts, setOpenProducts] = useState<boolean>(false);
  const [Prods, setProds] = useState<product[]>([]);
  const [Filtered, setFiltered] = useState<product[]>([]);
  const [query, setQuery] = useState<string>("");

  const toggleOpen = () => setOpenProducts(prev => !prev);

  // normaliza: minúsculas + sin tildes + trim
  const norm = (s: string = "") =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  // clave estable por item (para borrar/identificar)
  const stableKey = (item: product) =>
    (item as any).id?.toString?.() ??
    item.code?.toString?.() ??
    item.extracode?.toString?.() ??
    item.name;

  const applySearch = (list: product[], qRaw: string) => {
    const q = norm(qRaw);
    if (!q) return list;
    return list.filter((p: product) => {
      const n = norm(p.name);
      const c = norm(p.code ?? "");
      const e = norm(p.extracode ?? "");
      return n.includes(q) || c.includes(q) || e.includes(q);
    });
  };

  const searchProducts = (qRaw: string) => {
    setQuery(qRaw);
    setFiltered(applySearch(Prods, qRaw));
  };

  const onchoose = (val: product) => {
    onSelected(val);
    setOpenProducts(false);
    setQuery("");
    setFiltered(Prods);
  };

  const deleteItem = (item: product) => {
    setProds(prev => {
      const updated = prev.filter(p => stableKey(p) !== stableKey(item));
      // re-aplicar filtro actual sobre la nueva lista
      setFiltered(applySearch(updated, query));
      return updated;
    });
  };

  useEffect(() => {
    const base = products_of_this_wh ?? [];
    setProds(base);
    setFiltered(applySearch(base, query));
  }, [products_of_this_wh]);

  // key extractor robusto (usa index solo para evitar colisiones)
  const keyExtractor = (item: product, index: number) =>
    `${stableKey(item)}-${index}`;

  const renderItem = ({ item }: { item: product }) => (
    <View
      style={{
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      {/* Área seleccionable */}
      <Pressable onPress={() => onchoose(item)} style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>{item.name}</Text>
        {!!item.code && <Text style={{ opacity: 0.6 }}>{item.code}</Text>}
        {!!item.extracode && (
          <Text style={{ opacity: 0.6 }}>{item.extracode}</Text>
        )}
      </Pressable>

      {/* Botón eliminar */}
      <Pressable
        onPress={() => deleteItem(item)}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          backgroundColor: "#e74c3c",
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Eliminar</Text>
      </Pressable>
    </View>
  );

  return (
    <View>
      <Pressable onPress={toggleOpen} style={{ paddingVertical: 8 }}>
        <Text>Press here to search a product</Text>
      </Pressable>

      {openProducts ? (
        <View>
          <View>
            <TextInput
              style={[styles.textinput]}
              placeholder="Search by name, code, extracode..."
              value={query}
              onChangeText={searchProducts}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <FlatList
            data={Filtered}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: "#eee" }} />
            )}
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default ProductPicker;
