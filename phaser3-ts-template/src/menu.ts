export default class Menu extends Phaser.Scene {
    private width: number;
    private height: number;

    constructor(config: Phaser.Types.Core.GameConfig) {
        super("Menu");
    }

    init () {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    preload () {
    }

    create () {
        const logo = this.add.image(this.width/2, 70, 'logo');
        const playText: Phaser.GameObjects.Text = this.add.text(
            50, 
            this.height/2, 
            'JUGAR', 
            {fontSize:'32px', color:'#FFFFFF'}).setInteractive();
        this.changeScene(playText, 'Scene1');

    }
    
     
    changeScene(playText: Phaser.GameObjects.Text, scene: string) {
        playText.on('pointerdown', () => {
            this.scene.start(scene);
        });
    }
}