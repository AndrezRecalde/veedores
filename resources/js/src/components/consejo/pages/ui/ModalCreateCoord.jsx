import { Button, Divider, Grid, Modal, MultiSelect, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    Icon123,
    IconAt,
    IconBrandTelegram,
    IconPhonePlus,
} from "@tabler/icons";
import React, { useEffect } from "react";
import { useAuthStore } from "../../../../hooks/useAuthStore";
import { useConsejoStore } from "../../../../hooks/useConsejoStore";
import { useStatesStore } from "../../../../hooks/useStatesStore";
import { useUiStore } from "../../../../hooks/useUiStore";

export const ModalCreateCoord = () => {
    const { isOpenModalCreateCoord, modalActionCoord } = useUiStore();
    const { activateUser, setClearActivateUser, startSavingCoord } =
        useConsejoStore();
    const { startProfile } = useAuthStore();

    const {
        cantones,
        parroquias,
        recintos,
        roles,
        startLoadParroquias,
        startLoadRecintos,
        startClearStates,
    } = useStatesStore();

    const form = useForm({
        initialValues: {
            first_name: "",
            last_name: "",
            dni: "",
            phone: "",
            email: "",
            roles: [3],
            canton_id: 0,
            parroquia_id: 0,
            recinto_id: 0,
        },
        validate: {
            first_name: (value) =>
                value.length < 3 ? "El nombre es requerido" : null,
            last_name: (value) =>
                value.length < 3 ? "El apellido es requerido" : null,
            dni: (value) =>
                value.length < 9 ? "Ingrese la cédula correctamente (deben ser 10 dígitos)" :
                value.length > 10 ? "Ingrese el número correctamente (deben ser 10 dígitos)":  null,
            phone: (value) =>
                value.length < 10 ? "Ingrese el número correctamente (deben ser 10 dígitos)" :
                value.length > 10 ? "Ingrese el número correctamente (deben ser 10 dígitos)": null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            canton_id: (value) => (value === 0 ? "Ingrese el cantón" : null),
            parroquia_id: (value) =>
                value === 0 ? "Ingrese la parroquia" : null,
            recinto_id: (value) => (value === 0 ? "Ingrese el recinto" : null),
        },
    });

    const { canton_id, parroquia_id } = form.values;

    useEffect(() => {
        form.setFieldValue("parroquia_id", 0);
        startLoadParroquias({ canton_id });
    }, [canton_id]);

    useEffect(() => {
        form.setFieldValue("recinto_id", 0);
        startLoadRecintos({ parroquia_id });
    }, [parroquia_id]);

    useEffect(() => {
        if (activateUser !== null) {
            form.setValues({
                ...activateUser,
            });
            return;
        }
        form.reset();

    }, [activateUser]);




    const handleCreateCoord = async (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("first_name") &&
            !errors.hasOwnProperty("last_name") &&
            !errors.hasOwnProperty("dni") &&
            !errors.hasOwnProperty("phone") &&
            !errors.hasOwnProperty("email") &&
            !errors.hasOwnProperty("canton_id") &&
            !errors.hasOwnProperty("parroquia_id") &&
            !errors.hasOwnProperty("recinto_id")
        ) {
            await startSavingCoord(form.values);
            modalActionCoord("close");
            await startProfile();
            form.reset();
        } else {
            console.log("Error");
        }
    };

    const handleCloseModal = () => {
        modalActionCoord("close");
        setClearActivateUser();
        startClearStates();
        form.reset();
    };

    return (
        <Modal
            opened={isOpenModalCreateCoord}
            onClose={handleCloseModal}
            title="Crear Coordinador"
        >
            <form onSubmit={handleCreateCoord}>
                <Grid grow>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Nombres"
                            label="Nombres"
                            withAsterisk
                            {...form.getInputProps("first_name")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Apellidos"
                            label="Apellidos"
                            withAsterisk
                            {...form.getInputProps("last_name")}
                        />
                    </Grid.Col>
                </Grid>
                <Grid grow>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Cédula"
                            label="Cédula"
                            icon={<Icon123 size={14} />}
                            mt={16}
                            withAsterisk
                            {...form.getInputProps("dni")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Teléfono"
                            label="Teléfono"
                            icon={<IconPhonePlus size={14} />}
                            mt={16}
                            withAsterisk
                            {...form.getInputProps("phone")}
                        />
                    </Grid.Col>
                </Grid>
                <MultiSelect
                    label="Role"
                    mt={16}
                    withAsterisk
                    readOnly
                    variant="filled"
                    {...form.getInputProps("roles")}
                    data={roles.map((role) => {
                        return {
                            value: role.id,
                            label: role.name,
                        };
                    })}
                />
                <TextInput
                    placeholder="Email"
                    label="Email"
                    mt={16}
                    icon={<IconAt size={14} />}
                    withAsterisk
                    {...form.getInputProps("email")}
                />
                <Select
                    label="Cantón"
                    placeholder="Cantón"
                    mt={16}
                    withAsterisk
                    {...form.getInputProps("canton_id")}
                    data={cantones.map((canton) => {
                        return {
                            value: canton.id,
                            label: canton.nombre_canton,
                        };
                    })}
                />
                <Select
                    label="Parroquia"
                    placeholder="Parroquia"
                    mt={16}
                    withAsterisk
                    {...form.getInputProps("parroquia_id")}
                    data={parroquias.map((parroquia) => {
                        return {
                            value: parroquia.id,
                            label: parroquia.nombre_parroquia,
                        };
                    })}
                />
                <Select
                    label="Recinto"
                    placeholder="Recinto"
                    mt={16}
                    withAsterisk
                    {...form.getInputProps("recinto_id")}
                    data={recintos.map((recinto) => {
                        return {
                            value: recinto.id,
                            label: recinto.nombre_recinto,
                        };
                    })}
                />
                <Divider my="sm" variant="dashed" />
                <Button
                    onClick={handleCreateCoord}
                    fullWidth
                    leftIcon={<IconBrandTelegram />}
                    color="yellow"
                >
                    Crear
                </Button>
            </form>
        </Modal>
    );
};
