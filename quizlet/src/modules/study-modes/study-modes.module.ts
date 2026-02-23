import { Module } from '@nestjs/common';
import { FlashcardsModeModule } from './flashcards-mode/flashcards-mode.module';
import { LearnModeModule } from './learn-mode/learn-mode.module';
import { WriteModeModule } from './write-mode/write-mode.module';
import { TestModeModule } from './test-mode/test-mode.module';
import { MatchModeModule } from './match-mode/match-mode.module';
import { SpacedRepetitionModule } from './spaced-repetition/spaced-repetition.module';

@Module({
  imports: [FlashcardsModeModule, LearnModeModule, WriteModeModule, TestModeModule, MatchModeModule, SpacedRepetitionModule]
})
export class StudyModesModule {}
