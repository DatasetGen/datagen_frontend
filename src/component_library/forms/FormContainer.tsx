import React, {useState} from 'react';
import {StyleSystemProps} from "../types.ts";
import {formContainerStyles} from "./styles.ts";


export interface FormContainerProps<e> extends StyleSystemProps, Omit<Omit<React.HTMLProps<e>, 'size'>, 'children'>{
    rightIcon?: (props: Partial<e>, setProps:  React.Dispatch<React.SetStateAction<Partial<e>>>) => React.ReactNode,
    leftIcon?: (props: Partial<e>, setProps:  React.Dispatch<React.SetStateAction<Partial<e>>>) => React.ReactNode,
    children?: (props: React.HTMLProps<e>) => React.ReactNode,
    invalid?: boolean,
    label?: string
}

function FormContainer<e>({size, leftIcon, rightIcon, colorSchema, label, children, invalid, ...props}: FormContainerProps<e>) {
    const {base, input} = formContainerStyles({
        colorSchema,
        size,
        invalid
    })

    const [extendedProps, setExtendedProps] = useState<Partial<e>>({})

    return (
        <div className="grid gap-2">
            {
                label && <label className="font-semibold text-gray-600 text-sm">{label}</label>
            }
            <div className={base()}>
                {
                    leftIcon && leftIcon({...props, ...extendedProps}, setExtendedProps)
                }
                {
                    children && children({
                        className: input(),
                        ...props,
                        ...extendedProps
                    })
                }
                {
                    rightIcon && rightIcon({...props, ...extendedProps}, setExtendedProps)
                }
            </div>
        </div>
    );
}

export default FormContainer;