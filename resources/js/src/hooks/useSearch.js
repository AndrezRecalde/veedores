import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import consejoApi from "../api/consejoApi";
import { onClearSearch, onSearch } from "../store/search/searchSlice";

export const useSearch = () => {

    const { results } = useSelector((state) => state.search);

    const dispatch = useDispatch();

    const startSearch = async(values = {}) => {
        dispatch(onClearSearch());
        try {
            const { data } = await consejoApi.post('/search', values);
            const { search } = data;
            dispatch(onSearch(search));
            if(data.status === "error"){
                Swal.fire({
                    icon: "error",
                    title: "No hay datos en esa zona de busqueda!",
                    showConfirmButton: false,
                    timer: 1200,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const startExportFilter = async(values = {}) => {
        try {
            const response = await consejoApi.post('/pdf/exportacion/veedores', values, {responseType:"blob"});
            const url = window.URL.createObjectURL(new Blob([response.data],{type:'application/pdf'}));
            window.open(url, "_blank");
        } catch (error) {
            console.log(error)
        }
    }

    const startExportExcel = async(values = {}) => {
        try {
            const response = await consejoApi.post('/excel/exportacion/veedores', values, {responseType:"blob"});
            const url = window.URL.createObjectURL(new Blob([response.data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'}));
            window.open(url, "_blank");
        } catch (error) {
            console.log(error)
        }
    }


    //StartSearchCoords
    const startSearchCoords = async(values = {}) => {
        dispatch(onClearSearch());
        try {
            const { data } = await consejoApi.post('/search/coordinadores', values);
            const { coordinadores } = data;
            dispatch(onSearch(coordinadores));
            if(data.status === "error"){
                Swal.fire({
                    icon: "error",
                    title: "No hay datos en esa zona de busqueda!",
                    showConfirmButton: false,
                    timer: 1200,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    const startExportFilterCoords = async(values = {}) => {
        try {
            const response = await consejoApi.post('/pdf/exportacion/coordinadores', values, {responseType:"blob"});
            const url = window.URL.createObjectURL(new Blob([response.data],{type:'application/pdf'}));
            window.open(url, "_blank");
        } catch (error) {
            console.log(error)
        }
    }

    const startExportExcelCoords = async(values = {}) => {
        try {
            const response = await consejoApi.post('/excel/exportacion/coordinadores', values, {responseType:"blob"});
            const url = window.URL.createObjectURL(new Blob([response.data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'}));
            window.open(url, "_blank");
        } catch (error) {
            console.log(error)
        }
    }

    //StartSearchCoords
    const startSearchSuper = async(values = {}) => {
        dispatch(onClearSearch());
        try {
            const { data } = await consejoApi.post('/search/supervisores', values);
            const { supervisores } = data;
            dispatch(onSearch(supervisores));
            if(data.status === "error"){
                Swal.fire({
                    icon: "error",
                    title: "No hay datos en esa zona de busqueda!",
                    showConfirmButton: false,
                    timer: 1200,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const startExportFilterSupers = async(values = {}) => {
        try {
            const response = await consejoApi.post('/pdf/exportacion/supervisores', values, {responseType:"blob"});
            const url = window.URL.createObjectURL(new Blob([response.data],{type:'application/pdf'}));
            window.open(url, "_blank");
        } catch (error) {
            console.log(error)
        }
    }

    const startExportExcelSupers = async(values = {}) => {
        try {
            const response = await consejoApi.post('/excel/exportacion/supervisores', values, {responseType:"blob"});
            const url = window.URL.createObjectURL(new Blob([response.data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'}));
            window.open(url, "_blank");
        } catch (error) {
            console.log(error)
        }
    }

    const startClearResults = () => {
        dispatch(onClearSearch());
    }

    return {
        results,

        startSearch,
        startSearchCoords,
        startSearchSuper,
        startExportFilter,
        startExportExcel,
        startExportFilterCoords,
        startExportExcelCoords,
        startExportFilterSupers,
        startExportExcelSupers,
        startClearResults
    };
};
