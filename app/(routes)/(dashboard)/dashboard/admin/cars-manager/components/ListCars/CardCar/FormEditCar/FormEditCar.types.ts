import { Auto } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type FormEditCarProps = {
    autoData: Auto;
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}