import { useNuxtApp, useAsyncData, useRouter } from '#imports'
import type { Ref } from 'vue'
import { type IItem, type IBrowser } from '@/components/Base/Browser/Browser.vue';
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from '#vue-router'

export interface IConfigCreateEdit {
    formURL: string,
    modalPath: string,
    modalTitle: string,
    notificationMessage: string
}

export interface IConfigDelete {
    deleteURL: string,
    notificationMessage: string,
    redirectURL?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}

export const usePage = () => {

    const item: Ref<IItem|undefined> = ref()
    const browserEl: Ref<IBrowser|null> = ref(null)

    const {
        $modal,
        $notification,
        $authFetch
    } = useNuxtApp()

    const onClickCreate = async (config: IConfigCreateEdit) => {
        const formResponse = await $authFetch(config.formURL, {
            method: 'GET',
            params: {
                id: item.value!.id,
            },
        })

        $modal.load(config.modalPath, {
            title: config.modalTitle,
            formResponse
        }).then(() => {
            browserEl.value!.reset()
            $notification.push({type: 'success', message: config.notificationMessage})
        })
    }

    const onClickEdit = async (config: IConfigCreateEdit) => {
        const formResponse = await $authFetch(config.formURL, {
            method: 'GET',
            params: {
                id: item.value!.id,
            },
        })

        $modal.load(config.modalPath, {
            title: config.modalTitle,
            id: item.value!.id,
            formResponse
        }).then(() => {
            browserEl.value!.reset(true)
            $notification.push({type: 'success', message: config.notificationMessage})
        })
    }

    const onClickDelete = (config: IConfigDelete) => {
        $modal.confirm().then(async (isAgree) => {
            if (!isAgree) {
                return
            }

            await $authFetch(config.deleteURL, {
                method: 'POST',
                body: {
                    id: item.value!.id,
                },
            })

            $notification.push({type: 'success', message: config.notificationMessage})
            item.value = {}

            if (browserEl.value !== null) {
                browserEl.value.reset()
                browserEl.value.closeDetail()

                return
            }

            if (config.redirectURL) {
                await useRouter().push(config.redirectURL)
            }
        })
    }

    const SSRLoadDetail = async (item: Ref<IItem|undefined>, detailURL: string, id: string|string[]) => {

        const response = await useAsyncData(
            detailURL.replaceAll('/', '_'),
            () => $authFetch(detailURL, {
                params: {
                    id: id,
                }
            }),
        )

        if (response.status.value === 'error') {
            throw createError({
                statusCode: 404,
                message: 'Страницы не существует',
            })
        }

        if (
            typeof response.data.value === 'object' &&
            response.data.value !== null
        ) {
            item.value = response.data.value
        }
    }

    const onItemUpdated = (_item: IItem) => {
        item.value = _item
    }

    return {
        browserEl,
        item,

        onClickCreate,
        onClickEdit,
        onClickDelete,
        onItemUpdated,

        SSRLoadDetail
    }
}