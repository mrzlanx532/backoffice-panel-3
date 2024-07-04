import { defineComponent, h, withDirectives } from 'vue'
import { vMaska } from 'maska'

const createInput = (ctx) => {
    const inputAttrs = {
        class: 'input',
        name: ctx.name,
        type: 'text',
        autocomplete: 'off',
        value: ctx.modelValue,
        label: ctx.label,
        onInput: ctx.onInput
    }

    const directives = []

    if (ctx.componentData?.mask) {
        inputAttrs['data-maska'] = ctx.componentData.mask
        directives.push([vMaska])
    }

    const input = h('input', inputAttrs)

    if (directives.length > 0) {
        return withDirectives(input, directives)
    }

    return input
}

export default defineComponent({
    computed: {
        inputContainerClasses () {
            const inputContainerClasses = ['input__container']

            if (this.errors && this.errors[0]) {
                inputContainerClasses.push('input__container_error')
            }

            return inputContainerClasses.join(' ')
        },
    },
    props: {
        label: {
            required: true,
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
        modelValue: {
            type: String
        },
        errors: {
            type: Array,
            required: false,
            default: []
        },
        componentData: {
            type: Object,
            required: false
        }
    },
    methods: {
        onInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    },
    render: (ctx) => {

        const input = createInput(ctx)

        return (
            <div>
                <label class="label">{ctx.label}</label>
                <div class={ctx.inputContainerClasses}>
                    {input}
                </div>
                <div class="input__error">{ctx.errors && ctx.errors[0] ? ctx.errors[0] : null}</div>
            </div>
        )
    }
})