import { getSearchSelectData } from "@/data/services/select.services";
import { Box, LoadingOverlay, Select, SelectItem } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "react-query";
import SelectOption from "../../atoms/SelectOption/SelectOption";
import React from "react";

interface Props {
  onChange: (data: any) => void;
  endpoint: string;
  value: any;
}

const SelectSearchForm = React.forwardRef(
  ({ onChange, value, endpoint, ...props }: Props, ref: any) => {
    const [searchValue, onSearchChange] = useState("");

    const { data, isLoading } = useQuery(
      [`${endpoint}_select_search`, { endpoint, searchValue }],
      () => getSearchSelectData<SelectItem>({ endpoint, search: searchValue }),
      {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      }
    );
    return (
      <Box pos="relative">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <Select
          {...props}
          ref={ref}
          searchable
          onSearchChange={onSearchChange}
          itemComponent={SelectOption}
          searchValue={searchValue}
          onChange={onChange}
          clearable
          value={value}
          nothingFound="No se encuentran resultados"
          data={data || []}
        />
      </Box>
    );
  }
);

SelectSearchForm.displayName = "SelectSearchForm";

export default SelectSearchForm;
