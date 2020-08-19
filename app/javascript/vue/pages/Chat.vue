<template>
  <div class="flex flex-col justify-center items-center pt-10">
    <form @submit.prevent="mutate">
      <tw-card>
        <p>This is example chat app!</p>
        Hello {{ currentUser ? currentUser.email : 'loading' }}

        <p class="pt-10">Say!</p>
        <tw-input v-model="state.text" />
        <tw-button class="w-full mt-3" :disabled="loading">Submit</tw-button>
        <span>{{ error }}</span>
      </tw-card>
    </form>
    <div class="mt-5">
      <p v-for="(message, i) in state.messages" :key="i">{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { useCurrentUser } from '@/vue/hooks/currentUser'
import {
  SayDocument,
  SayMutation,
  SayMutationVariables,
  useOnMessageAddedSubscription
} from '../graphql'
import { useMutation } from '@vue/apollo-composable'

type State = {
  text: string
  messages: string[]
}

export default defineComponent({
  setup() {
    const state = reactive<State>({
      text: '',
      messages: []
    })
    const { currentUser } = useCurrentUser()

    const { mutate, error, loading, onDone, onError } = useMutation<
      SayMutation,
      SayMutationVariables
    >(SayDocument, () => ({
      variables: {
        input: {
          text: `Vue: ${state.text}`
        }
      }
    }))

    const { onResult } = useOnMessageAddedSubscription()

    onDone(() => (state.text = ''))
    onError((e) => {
      // TODO: get validation errors from graphQLErrors
      console.log(e)
    })
    onResult((result) => {
      const message = result?.data?.onMessageAdded.message
      if (message) {
        state.messages.push(message)
      }
    })

    return { state, error, currentUser, loading, mutate }
  }
})
</script>

<style scoped></style>
