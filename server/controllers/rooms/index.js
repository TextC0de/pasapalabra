import crudController from './crud';
import minigamesController from './minigames';
import guessingMinigameController from './guessingMinigame';
import hangmanMinigameController from './hangmanMinigame';

export default {
    crud: crudController,
    minigames: minigamesController,
    guessing: guessingMinigameController,
    hangman: hangmanMinigameController
};
