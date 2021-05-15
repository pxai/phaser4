import { LEVELS, FONTS, PLAYER } from './constants';

export default class Load extends Phaser.Scene {
    private loadBar : Phaser.GameObjects.Graphics;
    private progressBar : Phaser.GameObjects.Graphics;
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }

    preload(): void {
        this.cameras.main.setBackgroundColor(0x000000);
        this.createBars();

        this.load.on(
            'progress',
            function (value: number) {
              this.progressBar.clear();
              this.progressBar.fillStyle(0x125555, 1);
              this.progressBar.fillRect(
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 16,
                (this.cameras.main.width / 2) * value,
                16
              );
            },
            this
        );

        //Mapas
        this.load.tilemapTiledJSON(LEVELS.SCENE1.TILEMAPJSON, 'assets/scene1.json');
        this.load.image(LEVELS.TILESET, 'assets/tileset.png');


        this.load.image(LEVELS.SCENE1.BACKGROUND, 'assets/Background/Green.png');

        this.load.on('complete', () => {
        //        const fontJSON = this.cache.json.get(FONTS.FONT.JSON);
        //       this.cache.bitmapFont.add(FONTS.FONT.IMAGE, Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

                this.scene.start('Menu');
            },
            this
        );
        this.load.image('logo', 'assets/phaser3-logo.png');      

        this.load.bitmapFont("pixelFont", "assets/fonts/font.png", "assets/fonts/font.xml");

        this.load.atlas(PLAYER.ID, 'assets/images/player/ninjafrog.png', 'assets/images/player/ninjafrog.json');
    }

    private createBars(): void {
        this.loadBar = this.add.graphics();
        this.loadBar.fillStyle(0xffffff, 1);
        this.loadBar.fillRect(
          this.cameras.main.width / 4 - 2,
          this.cameras.main.height / 2 - 18,
          this.cameras.main.width / 2 + 4,
          20
        );
        this.progressBar = this.add.graphics();
    }
}