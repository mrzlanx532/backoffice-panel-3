import type { Reactive } from 'vue'
import { cloneDeep } from 'lodash-es'

export const useForm = () => {

    const getFormDataValues = (formDataPropertyNames: string[]): Reactive<IItem> => {
        const preparedFormDataValues: IItem = {}

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
        getFormDataValues,
        formRequestBody
    }
}