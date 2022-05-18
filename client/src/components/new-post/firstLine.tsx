import React, { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import AsyncSelect from 'react-select/async';
import { SelectInterface } from '../../types/types';
import { RootState } from "../../store/store";
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';

const customStyles = {
    container: (provided: any) => ({ ...provided, zIndex: 202, }),
    control: (provided: any) => ({ ...provided, height: "56px", }),
    menuList: (provided: any) => ({ ...provided, maxHeight: "215px" }),
    indicatorsContainer: (provided: any) => ({ ...provided, cursor: "pointer" }),
    indicatorSeparator: () => ({ display: 'none' })
}

export default function FirstLine() {

    const { city, address, areas, street } = useSelector((state: RootState) => state.AddPost)

    const [areasList, setAreasList] = useState<SelectInterface[]>([])
    const [streetsList, setStreetsList] = useState<SelectInterface[]>([])

    const dispatch = useDispatch()

    const handlerInput = (v: SelectInterface | string, t: string) => {
        dispatch({ type: t, payload: v })
    }

    const optionsCity = (inputValue: string) => api.get(`/geo/get-cities?city=${inputValue}`)
        .then((res) => res.data.cities.map((it: any) => ({ label: it.cityName, value: it._id })))

    const optionsArea = (inputValue?: string) => api.get(`/geo/get-areas?idCity=${city?.value || ''}&area=${inputValue || ''}`)
        .then((res) => {
            const list = res.data.areas.map((it: any) => ({ label: it.areaName, value: it._id }))
            setAreasList(list)
            return list
        })

    const optionsStreet = (inputValue?: string) => api.get(`/geo/get-street?idCity=${city?.value || ''}&street=${inputValue || ''}`)
        .then((res) => {
            const list = res.data.streets.map((it: any) => ({ label: it.streetName, value: it._id }))
            setStreetsList(list)
            return list
        })

    useEffect(() => {
        optionsArea()
        optionsStreet()
    }, [city?.value,])

    return (
        <>
            <Box>
                <AsyncSelect
                    value={city}
                    onChange={(v: SelectInterface) => handlerInput(v, 'AP__CITY')}
                    defaultOptions
                    loadOptions={optionsCity}
                    isClearable
                    styles={{ ...customStyles, container: (provided: any) => ({ ...provided, zIndex: 205, }) }}
                    placeholder='Город'
                />
                <FormHelperText sx={{ marginLeft: "14px" }}>Обязательное поле</FormHelperText>
            </Box>
            <Box>
                <AsyncSelect
                    value={areas}
                    onChange={(v: SelectInterface) => handlerInput(v, 'AP__AREAS')}
                    defaultOptions={areasList}
                    loadOptions={optionsArea}
                    isClearable
                    styles={{ ...customStyles, container: (provided: any) => ({ ...provided, zIndex: 204, }) }}
                    placeholder='Район'
                />
                <FormHelperText sx={{ marginLeft: "14px" }}>Не обязательное поле</FormHelperText>
            </Box>
            <Box>
                <AsyncSelect
                    value={street}
                    onChange={(v: SelectInterface) => handlerInput(v, 'AP__STREET')}
                    defaultOptions={streetsList}
                    loadOptions={optionsStreet}
                    isClearable
                    styles={{ ...customStyles, container: (provided: any) => ({ ...provided, zIndex: 203, }) }}
                    placeholder='Улица'
                    aria-errormessage="fdvs"
                />
                <FormHelperText sx={{ marginLeft: "14px" }}>Обязательное поле </FormHelperText>
            </Box>
            <TextField value={address} onChange={e => handlerInput(e.target.value, "AP__HOUSE__NUM")}
                helperText="Обязательное поле"
                label="Номер дома"
                variant="outlined"
            />

        </>
    );
}