import { getSearchSelectData } from "@/data/services/select.services";
import { Select, SelectItem } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "react-query";

interface Props {
  onChange: (data: any) => void;
  endpoint: string;
}

const SelectSearchSale = ({ onChange, endpoint }: Props) => {
  const [searchValue, onSearchChange] = useState("");

  const { data } = useQuery(
    [`${endpoint}_select_search`, { endpoint, searchValue }],
    () => getSearchSelectData<SelectItem>({ endpoint, search: searchValue }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const changeValue = (val: string | null) => {
    onChange(data?.find((item: SelectItem) => item?.value === val) || null);
  };

  return (
    <Select
      label="Selecciona el producto"
      placeholder="Producto a incluir en la venta"
      searchable
      onSearchChange={onSearchChange}
      searchValue={searchValue}
      onChange={changeValue}
      value={null}
      nothingFound="No se encuentran resultados"
      data={data || []}
    />
  );
};

export default SelectSearchSale;
