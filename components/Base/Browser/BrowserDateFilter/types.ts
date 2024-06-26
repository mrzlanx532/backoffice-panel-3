import type { Moment } from 'moment/moment'

export interface IRow {
    value: string,
    moment: Moment
    isCurrentMonth: boolean,
    isSelectedValue: boolean,
    isToday: boolean
}

export interface IMonth {
    value: string,
    moment: Moment,
    isCurrentMonth: boolean,
}

export interface IYear {
    value: string,
    moment: Moment,
    isCurrentYear: boolean,
}