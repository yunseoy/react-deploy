import {create} from 'zustand'

const useGameStore = create((set) => ({
  history: [Array(9).fill(null)],
  currentMove: 0,
  setHistory: nextHistory => set((state) => ({
        history: typeof nextHistory === 'function'
            ? nextHistory(state.history)
            : nextHistory
      })),

  setCurrentMove: nextCurrentMove => set((state) => ({
    currentMove: typeof nextCurrentMove === 'function'
        ? nextCurrentMove(state.currentMove)
        : nextCurrentMove
  })),

}))

export default useGameStore