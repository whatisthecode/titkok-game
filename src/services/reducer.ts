import { GameData } from '../types/type';

export function GameReducer(state: GameData, action: GameData & { type: string }): GameData {
  if (action.type === 'UPDATE') {
    const newAction: GameData & { type?: string } = { ...action };
    delete newAction.type;
    return {
      ...state,
      ...newAction,
    };
  }
  return state;
}
