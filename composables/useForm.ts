import {
    type Component,
    defineComponent,
    type DefineProps,
    h,
    type Reactive,
    type Ref,
    type ShallowRef,
    type VNode
} from 'vue'
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
import FormSwitcher from '~/components/Base/Form/Switcher.vue'
import Form from '~/components/Base/Form.vue'

interface IFormComponent {
    name: string
    label: string
    class?: string
    section?: string
    hide?: boolean,
    onUpdate?: (value: any) => void
}

interface ISelect extends IFormComponent {
    componentData?: {
        options?: {}[],
        isMultiple?: boolean
    }
}
interface ITextArea extends IFormComponent {}
interface ICheckbox extends IFormComponent {}
interface IInput extends IFormComponent {
    componentData?: {
        disabled?: boolean,
        description?: string,
        mask?: string,
        type?: 'text' | 'password'
    }
}
interface IDatetime extends IFormComponent {
    componentData: {
        format: string
    }
}
interface IDate extends IFormComponent{
    componentData: {
        format: string
    }
}
interface IInputFile extends IFormComponent {
    componentData: {
        allowedTypes: string[],
        maxSizeMB?: number
    }
}


type TFormDataItemInput = ISelect | IInput | IDatetime | IDate | IInputFile | ITextArea | ICheckbox
type TFormDataItemOutput = IFormComponent & { component: Component, componentData: any }

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

interface ITabWithFormData {
    title: string,
    component: Component,
    formData: TFormDataItemOutput[]
    hasError?: boolean,
    formClass?: string
}

type propsWithDefaultPropsType = DefineProps<LooseRequired<defaultProps>, never>

const isTabWithFormData = (item: ITabWithFormData|TFormDataItemOutput): item is ITabWithFormData => {
    return 'formData' in item
}

export const useForm = () => {

    const initFormWithTabs = (
        createURL: string,
        updateURL: string,
        tabsWithFormData: ITabWithFormData[],
    ) => {
        const { $authFetch } = useNuxtApp()

        const formDataValues = getFormDataValuesFromTabs(tabsWithFormData)
        const errors: Ref<Record<string, any>> = ref({})

        const selectedTab = ref(0)

        const onChangeTab = (_selectedTab: number) => {
            selectedTab.value = _selectedTab
        }

        const onChangeFormData = (param: string, value: any) => {
            formDataValues[param] = value
        }

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

        const shallowRefTabsWithFormData = shallowRef(tabsWithFormData)

        return {
            tabsWithFormData: shallowRefTabsWithFormData,
            formDataValues,
            errors,
            selectedTab,

            onClickSave,
            onChangeTab,
            onChangeFormData
            //getFormComponent
        };
    }

    const initForm = (
        createURL: string,
        updateURL: string,
        formData: TFormDataItemOutput[],
        formClass?: string
    ) => {
        const { $authFetch } = useNuxtApp()

        const formDataValues = getFormDataValues(formData)
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
            formData: ShallowRef<TFormDataItemOutput[]>,
            errors: Ref<Record<string, any>>
        ) => {
            return defineComponent(
                (_props) => {
                    return () => {

                        const contentFormData: VNode[] = []

                        formData.value.forEach((formDataItem) => {
                            if (formDataItem.section) {
                                contentFormData.push(h('div', {class: 'form__section --full'}, formDataItem.section))
                            }

                            if (formDataItem.hide) {
                                return
                            }

                            contentFormData.push(
                                h(formDataItem.component, {
                                    componentData: formDataItem?.componentData,
                                    class: formDataItem.class,
                                    label: formDataItem.label,
                                    name: formDataItem.name,
                                    modelValue: formDataValues[formDataItem.name],
                                    'onUpdate:modelValue': (value: any) => {
                                        formDataValues[formDataItem.name] = value
                                        delete errors.value[formDataItem.name]

                                        if (formDataItem.onUpdate) {
                                            formDataItem.onUpdate(value)
                                        }
                                    },
                                    errors: errors.value[formDataItem.name]
                                })
                            )
                        })

                        return h(Form, {
                            title: props.data.title,
                            onClose: () => {
                                emit('modal:close')
                            }
                        }, {
                            content: () => h('div', {class: 'grid ' + (formClass ? formClass : '--2x2')}, contentFormData),
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

        const shallowRefFormData = shallowRef(formData)

        const findFormDataItemByName = (name: string) => {
            return shallowRefFormData.value.find(formDataItem => formDataItem.name === name)
        }

        return {
            formData: shallowRefFormData,
            formDataValues,
            errors,

            onClickSave,
            getFormComponent,
            findFormDataItemByName
        };
    }

    const getFormDataValuesFromTabs = (tabsWithFormData: ITabWithFormData[]): Reactive<Record<string, any>> => {
        const preparedFormDataValues: Record<string, undefined> = {}

        tabsWithFormData.forEach((tab) => {
            tab.formData.forEach((formDataItem) => {
                preparedFormDataValues[formDataItem.name] = undefined
            })
        })

        return reactive(preparedFormDataValues)
    }

    const getFormDataValues = (formDataItems: TFormDataItemInput[]): Reactive<Record<string, any>> => {
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

    const select = (config: ISelect): TFormDataItemOutput =>  {
        return {
            component: FormSelect,
            name: config.name,
            label: config.label,
            class: config.class,
            section: config.section,
            onUpdate: config.onUpdate,
            hide: config.hide ? config.hide : false,
            componentData: {
                options: []
            }
        }
    }

    const input = (config: IInput): TFormDataItemOutput => {
        return {
            component: FormInput,
            name: config.name,
            label: config.label,
            class: config.class,
            section: config.section,
            onUpdate: config.onUpdate,
            hide: config.hide ? config.hide : false,
            componentData: config.componentData ? config.componentData : {},
        }
    }

    const date = (config: IDate): TFormDataItemOutput => {
        return {
            component: FormDate,
            name: config.name,
            label: config.label,
            class: config.class,
            section: config.section,
            onUpdate: config.onUpdate,
            hide: config.hide ? config.hide : false,
            componentData: config.componentData ? config.componentData : {},
        }
    }

    const datetime = (config: IDatetime): TFormDataItemOutput => {
        return {
            component: FormDatetime,
            name: config.name,
            label: config.label,
            class: config.class,
            section: config.section,
            onUpdate: config.onUpdate,
            hide: config.hide ? config.hide : false,
            componentData: config.componentData ? config.componentData : {},
        }
    }

    const inputFile = (config: IInputFile): TFormDataItemOutput => {
        return {
            component: FormInputFile,
            name: config.name,
            label: config.label,
            class: config.class,
            section: config.section,
            onUpdate: config.onUpdate,
            hide: config.hide ? config.hide : false,
            componentData: config.componentData ? config.componentData : {},
        }
    }

    const textArea = (config: ITextArea): TFormDataItemOutput => {
        return {
            component: FormTextArea,
            name: config.name,
            label: config.label,
            class: config.class,
            section: config.section,
            onUpdate: config.onUpdate,
            hide: config.hide ? config.hide : false,
            componentData: {}
        }
    }

    const checkbox = (config: ICheckbox): TFormDataItemOutput => {
        return {
            component: FormCheckbox,
            name: config.name,
            label: config.label,
            class: config.class,
            section: config.section,
            onUpdate: config.onUpdate,
            hide: config.hide ? config.hide : false,
            componentData: {}
        }
    }

    const switcher = (config: ICheckbox): TFormDataItemOutput => {
        return {
            component: FormSwitcher,
            name: config.name,
            label: config.label,
            class: config.class,
            section: config.section,
            onUpdate: config.onUpdate,
            hide: config.hide ? config.hide : false,
            componentData: {}
        }
    }

    const fillComponents = (
        props: propsWithDefaultPropsType,
        formData: ShallowRef<TFormDataItemOutput[]|ITabWithFormData[]>,
        formDataValues: Record<string, undefined>,
        optionsMapper?: {[key: string]: {
            to: string,
            fn?: (item: Record<string, any>) => any}
        },
        valueMapper?: {[key: string]: {
            fn: (item: Record<string, any>, entity?: Record<string, any>) => any
        }}
    ) => {
        const formResponse = props.data.formResponse

        if (optionsMapper) {
            const mapperEntries = Object.entries(optionsMapper)

            formData.value.forEach(formDataItem => {

                if (isTabWithFormData(formDataItem)) {
                    formDataItem.formData.forEach((_formDataItem) => {
                        mapperEntries.map(([key, config]) => {

                            if (_formDataItem.name === config.to) {
                                formResponse[key].forEach((option: any) => {
                                    _formDataItem.componentData.options.push(config.fn ? config.fn(option) : option)
                                })
                            }
                        })
                    })

                    return
                }

                mapperEntries.map(([key, config]) => {

                    if (formDataItem.name === config.to) {
                        formResponse[key].forEach((option: any) => {
                            formDataItem.componentData.options.push(config.fn ? config.fn(option) : option)
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
        initFormWithTabs,

        fillComponents,

        getFormDataValues,
        formRequestBody,

        select,
        input,
        date,
        datetime,
        inputFile,
        textArea,
        checkbox,
        switcher
    }
}