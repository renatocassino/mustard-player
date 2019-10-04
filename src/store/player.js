import { observable } from 'mobx';

const Player = observable({
  isPlaying: observable.box(false),
  loopActive: observable.box(false),
});

export default Player
