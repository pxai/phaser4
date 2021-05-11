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
        this.load.tilemapTiledJSON('scene1', 'assets/scene1.json');
        this.load.image('tileset', 'assets/tileset.png');

        //Listener cuando se hayan cargado todos los Assets  
        this.load.on(
            'complete',
            function () {
                this.scene.start('Menu');
            },
            this
        );
        this.load.image('logo', 'assets/phaser3-logo.png');      

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