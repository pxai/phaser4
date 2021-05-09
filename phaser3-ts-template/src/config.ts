import Load from './load';
import Menu from './Menu';
import Scene1 from './scene1';

export default {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: [Load, Menu, Scene1]
};