import { useNuxtApp } from '#imports'
import type { Ref } from 'vue'
import { type IItem, type IBrowser } from '@/components/Base/Browser/Browser.vue';

export interface IConfigCreateEdit {
    formURL: string,
    modalPath: string,
    modalTitle: string,
    notificationMessage: string
}

export interface IConfigDelete {
    deleteURL: string,
    notificationMessage: string
}

export const useBrowser = () => {

    const item: Ref<IItem|null> = ref(null)
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
            browserEl.value!.reset()
            browserEl.value!.closeDetail()
        })
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
        onItemUpdated
    }
}