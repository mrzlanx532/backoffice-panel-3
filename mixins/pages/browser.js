import Browser from "@/components/Base/Browser/Browser";

export default {
    name: "PageWithBrowser",
    middleware: 'auth',
    components: {
        Browser,
    },
    data() {
        return {
            id: null,
            item: {},
        }
    },
    methods: {
        onItemUpdated(item) {
            this.item = item
        }
    }
}