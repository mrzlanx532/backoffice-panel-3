export const detailConfigInfo = [
    {
        name: 'name',
        title: 'Имя',
        columnClass: 12
    },
    {
        name: 'email',
        title: 'E-mail',
        columnClass: 6
    },
    {
        name: 'phone',
        title: 'Телефон',
        columnClass: 6,
    },
    {
        name: 'about',
        title: 'О себе',
        columnClass: 12,
    },
]

export const detailConfigCompany = [
    {
        name: 'company_name',
        title: 'Компания',
        columnClass: 12
    },
    {
        name: 'company_business_type',
        title: 'Направление работы компании',
        columnClass: 6,
        toFormat(item) {
            return item?.company_business_type?.name_ru
        }
    },
    {
        name: 'job_title',
        title: 'Должность',
        columnClass: 6,
    },
    {
        name: 'company_address',
        title: 'Адрес',
        columnClass: 6,
    },
    {
        name: 'company_index',
        title: 'Индекс',
        columnClass: 6,
    },
    {
        name: 'company_country',
        title: 'Страна',
        columnClass: 6,
        toFormat(item) {
            return item?.company_country?.name_ru;
        }
    },
    {
        name: 'company_city',
        title: 'Город',
        columnClass: 6,
    },
    {
        name: 'about',
        title: 'Сайт компании',
        columnClass: 12,
    },
    {
        name: 'created_at',
        title: 'Добавлен',
        columnClass: 6,
        preset: {
            name: 'timestampToFormatPreset',
        }
    },
    {
        name: 'updated_at',
        title: 'Изменен',
        columnClass: 6,
        preset: {
            name: 'timestampToFormatPreset',
        }
    },
]

export const detailConfigSubscription = [
    {
        name: 'subscription_type',
        title: 'Тип',
        columnClass: 6,
        toFormat(item) {
            return item?.subscription_type?.title;
        }
    },
    {
        name: 'subscription_till',
        title: 'Дата окончания подписки',
        columnClass: 6,
        toFormat(item) {
            return item?.subscription_till
        }
    },
]

export const detailConfigSubscriptionExclusiveTracks = [
    {
        name: 'condition',
        title: 'Условия',
        columnClass: 6,
        toFormat(item) {
            return 'Активна только при действующей подписке на музыку';
        }
    },
    {
        name: 'subscription_till_for_exclusive_tracks',
        title: 'Дата окончания подписки',
        columnClass: 6,
        toFormat(item) {
            return item?.subscription_till_for_exclusive_tracks
        }
    },
]