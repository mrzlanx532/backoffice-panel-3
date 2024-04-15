export const getMethods = {
    onClickRow(id) {
        if (this.id === id) {
            this.id = null

            return
        }

        this.id = id
    },
    onCloseDetail() {
        this.id = null
        this.selectedState = {}
    }
}