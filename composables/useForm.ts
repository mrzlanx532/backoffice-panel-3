import { defineComponent, type DefineProps, h, type Reactive, type Ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useNuxtApp } from '#imports'
import { FetchError } from 'ofetch'
import type { LooseRequired } from '@vue/shared'
import FormSelect from '~/components/Base/Form/Select.vue'
import FormInput from '~/components/Base/Form/Input.jsx'
import FormDatetime from '~/components/Base/Form/Datetime.vue'
import FormDate from '~/components/Base/Form/Date.vue'
import FormInputFile from '~/components/Base/Form/InputFile.vue'
import FormTextArea from '~/components/Base/Form/TextArea.vue'
import FormCheckbox from '~/components/Base/Form/Checkbox.vue'
import Form from '~/components/Base/Form.vue'

interface ISelect {
    name: string,
    label: string,
    class?: string,
}

interface IInput {
    name: string,
    label: string,
    class?: string,
    componentData?: {
        disabled?: boolean,
        description?: string
    }
}

interface IDatetime {
    name: string,
    label: string,
    class?: string,
    componentData: {
        format: string
    }
}

interface IDate {
    name: string,
    label: string,
    class?: string,
    componentData: {
        format: string
    }
}

interface IInputFile {
    name: string,
    label: string,
    class?: string,
    componentData: {
        allowedTypes: string[]
    }
}

interface ITextArea {
    name: string,
    label: string,
    class?: string,
}

interface ICheckbox {
    name: string,
    label: string,
    class?: string,
}

type TFormDataItem = ISelect | IInput | IDatetime | IInputFile | ITextArea

export interface defaultProps {
    data: {
        formResponse: {
            entity?: {[key: string]: any}
            [key: string]: any,
        },
        title: string,
        id: number
    }
}

type propsWithDefaultPropsType = DefineProps<LooseRequired<defaultProps>, never>

export const useForm = () => {

    const initForm = (createURL: string, updateURL: string, formDataPropertyNames: TFormDataItem[]) => {
        const { $authFetch } = useNuxtApp()

        const formDataValues = getFormDataValues(formDataPropertyNames)
        const errors: Ref<Record<string, any>> = ref({})

        const onClickSave = async (
            props: propsWithDefaultPropsType,
            emit: (event: ("modal:resolve" | "modal:close"), ...args: any[]) => void
        ) => {
            let requestBody = formRequestBody(formDataValues, props.data.id)

            const URL = props.data.id ? updateURL : createURL

            try {

                await $authFetch(URL, {
                    method: 'POST',
                    body: requestBody,
                })

                emit('modal:resolve')

            } catch (err) {
                if (err instanceof FetchError) {
                    if (err.status === 422 && err.data.errors) {
                        errors.value = err.data.errors
                    }
                }
            }
        }

        const getFormComponent = (
            emit: (event: ("modal:resolve" | "modal:close"), ...args: any[]) => void,
            props: propsWithDefaultPropsType,
            formData: TFormDataItem[],
            errors: Ref<Record<string, any>>
        ) => {
            return defineComponent(
                (_props) => {
                    return () => {
                        return h(Form, {
                            title: props.data.title,
                            onClose: () => {
                                emit('modal:close')
                            }
                        }, {
                            content: () => h('div', {class: 'grid --2x2'}, formData.map((formDataItem) => {
                                return h(formDataItem.component, {
                                    componentData: formDataItem?.componentData,
                                    class: formDataItem.class,
                                    label: formDataItem.label,
                                    name: formDataItem.name,
                                    modelValue: formDataValues[formDataItem.name],
                                    'onUpdate:modelValue': (value: any) => {
                                        formDataValues[formDataItem.name] = value
                                    },
                                    errors: errors.value[formDataItem.name]
                                })
                            })),
                            footer: () => h('div', {class: 'btn__group'}, [
                                h('button', {
                                    class: 'btn --primary --big',
                                    onClick: () => onClickSave(props, emit),
                                }, 'Сохранить'),
                                h('button', {
                                    class: 'btn --outline-primary --big',
                                    onClick: () => {
                                        emit('modal:close')
                                    }
                                }, 'Отмена')
                            ])
                        })
                    }
                }
            )
        }

        return {
            formData: formDataPropertyNames,
            formDataValues,
            errors,

            onClickSave,
            getFormComponent
        };
    }

    const getFormDataValues = (formDataItems: TFormDataItem[]): Reactive<Record<string, any>> => {
        const preparedFormDataValues: Record<string, undefined> = {}

        formDataItems.map((formDataItem) => {
            preparedFormDataValues[formDataItem.name] = undefined
        })

        return reactive(preparedFormDataValues)
    }

    const formRequestBody = (formDataValues: IItem, id: number|undefined = undefined): IItem|FormData => {

        const _formDataValues = cloneDeep(formDataValues)

        let isRequiredFormData = false

        Object.values(_formDataValues).map((value) => {
            if (value instanceof File) {
                isRequiredFormData = true
            }
        });

        if (isRequiredFormData) {
            const formData = new FormData

            Object.entries(_formDataValues).map(([key, value]) => {

                if (value === undefined) {
                    return
                }

                if (typeof value === 'boolean') {
                    value = value ? 1 : 0
                }

                formData.append(key, value)
            })

            if (id !== undefined) {
                formData.append('id', id.toString())
            }

            return formData
        }

        Object.entries(_formDataValues).map(([key, value]) => {
            if (value instanceof Object) {
                _formDataValues[key] = undefined
            }
        })

        if (id !== undefined) {
            _formDataValues.id = id
        }

        return _formDataValues
    }

    const select = (config: ISelect) => {
        return {
            component: FormSelect,
            name: config.name,
            label: config.label,
            class: config.class,
            componentData: {
                options: []
            }
        }
    }

    const input = (config: IInput) => {
        return {
            component: FormInput,
            name: config.name,
            label: config.label,
            class: config.class,
            componentData: config.componentData ? config.componentData : undefined,
        }
    }

    const date = (config: IDate) => {
        return {
            component: FormDate,
            name: config.name,
            label: config.label,
            class: config.class,
            componentData: config.componentData,
        }
    }

    const datetime = (config: IDatetime) => {
        return {
            component: FormDatetime,
            name: config.name,
            label: config.label,
            class: config.class,
            componentData: config.componentData,
        }
    }

    const inputFile = (config: IInputFile) => {
        return {
            component: FormInputFile,
            name: config.name,
            label: config.label,
            class: config.class,
            componentData: config.componentData,
        }
    }

    const textArea = (config: ITextArea) => {
        return {
            component: FormTextArea,
            name: config.name,
            label: config.label,
            class: config.class,
            componentData: {}
        }
    }

    const checkbox = (config: ICheckbox) => {
        return {
            component: FormCheckbox,
            name: config.name,
            label: config.label,
            class: config.class,
            componentData: {}
        }
    }

    const fillComponents = (
        props: propsWithDefaultPropsType,
        formData: TFormDataItem[],
        formDataValues: Record<string, undefined>,
        optionsMapper?: {[key: string]: {
            to: string,
            fn: (item: Record<string, any>) => any}
        },
        valueMapper?: {[key: string]: {
            fn: (item: Record<string, any>, entity?: Record<string, any>) => any
        }}
    ) => {
        const formResponse = props.data.formResponse

        if (optionsMapper) {
            const mapperEntries = Object.entries(optionsMapper)

            formData.forEach(formDataItem => {
                mapperEntries.map(([key, config]) => {

                    if (formDataItem.name === config.to) {
                        formResponse[key].forEach((option: any) => {
                            // @ts-ignore
                            formDataItem.componentData.options.push(config.fn(option))
                        })
                    }
                })
            })
        }

        if (props.data.id) {
            Object.keys(formDataValues).map((key) => {
                formDataValues[key] = valueMapper && valueMapper[key] ?
                    valueMapper[key].fn(formResponse.entity![key], formResponse.entity) :
                    formResponse.entity![key]
            })
        }
    }

    return {
        initForm,

        fillComponents,

        getFormDataValues,
        formRequestBody,

        select,
        input,
        date,
        datetime,
        inputFile,
        textArea,
        checkbox
    }
}