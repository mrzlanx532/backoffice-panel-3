import moment from "moment";

export default {
    handleByPreset(column, rowItem) {
        return this[column.preset.name](column, rowItem)
    },
    timestampToFormatPreset(column, rowItem) {

        const date = moment(rowItem[column.name] * 1000)

        if (!date.isValid()) {
            return null;
        }

        if (column.preset.hasOwnProperty('locale')) {
            date.locale(column.preset.locale)
        } else {
            date.locale('ru')
        }

        return column.preset.hasOwnProperty('format') ? date.format(column.preset.format) : date.format('L')
    }
}