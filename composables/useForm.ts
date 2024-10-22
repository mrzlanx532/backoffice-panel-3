import type { DefineProps, Reactive, Ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useNuxtApp } from '#imports'
import { FetchError } from 'ofetch'
import type { LooseRequired } from '@vue/shared'

export interface defaultProps {
    data: {
        formResponse: Record<any, string>,
        title: string,
        id: number
    }
}

export const useForm = () => {

    const initForm = (formDataPropertyNames: string[]) => {
        const { $authFetch } = useNuxtApp()

        const formDataValues = getFormDataValues(formDataPropertyNames)
        const errors: Ref<Record<string, any>> = ref({})

        const onClickSave = async (
            props: DefineProps<LooseRequired<defaultProps>, never>,
            emit: (event: ("modal:resolve" | "modal:close"), ...args: any[]) => void
        ) => {
            let requestBody = formRequestBody(formDataValues, props.data.id)

            const method = props.data.id ? 'update' : 'create'

            try {

                await $authFetch(`blog/posts/${method}`, {
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

        return {
            formDataValues,
            errors,

            onClickSave
        };
    }

    const getFormDataValues = (formDataPropertyNames: string[]): Reactive<Record<string, undefined>> => {
        const preparedFormDataValues: Record<string, undefined> = {}

        formDataPropertyNames.map((propertyName) => {
            preparedFormDataValues[propertyName] = undefined
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

    return {
        initForm,
        getFormDataValues,
        formRequestBody
    }
}