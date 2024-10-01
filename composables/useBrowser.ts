import { useNuxtApp } from '#imports'
import type { Ref } from 'vue'
import { type IItem, type IBrowser } from '@/components/Base/Browser/Browser.vue';

export const useBrowser = () => {

    const item: Ref<IItem|null> = ref(null)
    const browserEl: Ref<IBrowser|null> = ref(null)

    const {
        $modal,
        $notification,
        $authFetch
    } = useNuxtApp()

    const onClickCreate = async (formURL: string, modalPath: string, notificationMsg: string) => {
        const formResponse = await $authFetch(formURL, {
            method: 'GET',
            params: {
                id: item.value!.id,
            },
        })

        $modal.load(modalPath, {
            title: 'Создание статьи',
            formResponse
        }).then(() => {
            browserEl.value!.reset()
            $notification.push({type: 'success', message: notificationMsg})
        })
    }

    const onClickEdit = async (formURL: string, modalPath: string, notificationMsg: string) => {
        const formResponse = await $authFetch(formURL, {
            method: 'GET',
            params: {
                id: item.value!.id,
            },
        })

        $modal.load(modalPath, {
            title: 'Редактирование статьи',
            id: item.value!.id,
            formResponse
        }).then(() => {
            browserEl.value!.reset(true)
            $notification.push({type: 'success', message: notificationMsg})
        })
    }

    const onClickDelete = (deleteURL: string, notificationMsg: string) => {
        $modal.confirm().then(async (isAgree) => {
            if (!isAgree) {
                return
            }

            await $authFetch(deleteURL, {
                method: 'POST',
                body: {
                    id: item.value!.id,
                },
            })

            $notification.push({type: 'success', message: notificationMsg})
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