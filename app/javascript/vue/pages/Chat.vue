<template>
  <div>
    <form class="flex justify-center items-start pt-10" @submit.prevent="say">
      <tw-card>
        <p>This is example chat app!</p>
        Hello {{ currentUser ? currentUser.email : 'loading' }}

        <p class="pt-10">Say!</p>
        <tw-input v-model="state.text" />
        <tw-button class="w-full mt-3" :disabled="loading">Submit</tw-button>
      </tw-card>
    </form>
    <div>{{ result }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent, reactive } from '@vue/composition-api'
import { useResult } from '@vue/apollo-composable'
import { useCurrentUser } from '@/vue/hooks/currentUser'
import { useSayMutation, useChatSubscription } from '@/graphql/types'

type State = {
  text: string
}

export default defineComponent({
  setup() {
    const state = reactive<State>({
      text: ''
    })
    const { currentUser } = useCurrentUser()

    const { mutate, error, loading, onDone } = useSayMutation({
      variables: { input: { text: '' } }
    })

    const { result } = useChatSubscription()

    const say = () => {
      mutate({
        input: {
          text: state.text
        }
      })
    }

    onDone(() => (state.text = ''))

    return { result, state, currentUser, loading, say }
  }
})
</script>

<style scoped></style>
