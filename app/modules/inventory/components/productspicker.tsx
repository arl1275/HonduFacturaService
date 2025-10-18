import { product } from "@/storage/modals/inventory";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import styles from "@/assets/styles/styles";
import { useEffect, useState, useMemo } from "react";

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

  const searchProducts = (qRaw: string) => {
    setQuery(qRaw);
    const q = norm(qRaw);

    if (!q) {
      setFiltered(Prods);
      return;
    }

    setFiltered(
      Prods.filter((p: product) => {
        const n = norm(p.name);
        const c = norm(p.code ?? "");
        const e = norm(p.extracode ?? "");
        return n.includes(q) || c.includes(q) || e.includes(q);
      })
    );
  };

  const onchoose = (val: product) => {
    onSelected(val);
    setOpenProducts(false);
    setQuery("");
    setFiltered(Prods);
  };

  useEffect(() => {
    setProds(products_of_this_wh ?? []);
    setFiltered(products_of_this_wh ?? []);
  }, [products_of_this_wh]);

  // key extractor robusto: usa code || extracode || name
  const keyExtractor = (item: product, index: number) =>
    (item as any).id?.toString?.() ??
    item.code?.toString?.() ??
    item.extracode?.toString?.() ??
    `${item.name}-${index}`;

  const renderItem = ({ item }: { item: product }) => (
    <Pressable onPress={() => onchoose(item)} style={{ paddingVertical: 8 }}>
      <Text style={{ fontSize: 16 }}>{item.name}</Text>
      {!!item.code && <Text style={{ opacity: 0.6 }}>{item.code}</Text>}
      {!!item.extracode && (
        <Text style={{ opacity: 0.6 }}>{item.extracode}</Text>
      )}
    </Pressable>
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
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default ProductPicker;
