import { LEVELS, SCENES } from './constants';

export default class Scene1 extends Phaser.Scene
{
    private width: number;
    private height: number;
    private points: number;

    private tileMap : Phaser.Tilemaps.Tilemap;
    private tileSet: Phaser.Tilemaps.Tileset;
    private tileMapLayer: Phaser.Tilemaps.TilemapLayer; 
    private background: Phaser.GameObjects.TileSprite;

    constructor ()
    {
        super('Scene1');
    }

    init () {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.points = 0;
    }

    preload () {
        this.load.image('logo', 'assets/phaser3-logo.png');
    }

    create () {
        console.log("Juegi!");
        const logo = this.add.image(400, 70, 'logo');
        const playText: Phaser.GameObjects.Text = this.add.text(
            50, 
            this.height/2, 
            'JUEGO', 
            {fontSize:'32px', color:'#FFFFFF'});

        const pointsTxt: Phaser.GameObjects.Text = this.add.text(this.width/2, this.height/2, 'POINTS -', {fontSize:'32px', color:'#FFFFFF'}).setInteractive();

        pointsTxt.on('pointerdown', ()=>{
            this.points++
            this.registry.set('points', this.points);
            this.events.emit('updatePoints');
        });

        this.tileMap = this.make.tilemap({ key: LEVELS.SCENE1.TILEMAPJSON , tileWidth: 16, tileHeight: 16 });
        
        this.tileSet = this.tileMap.addTilesetImage(LEVELS.TILESET);
        
        this.tileMapLayer = this.tileMap.createLayer(LEVELS.SCENE1.LAYER, this.tileSet);
        this.background = this
            .add
            .tileSprite(0,0,this.tileMap.widthInPixels, this.tileMap.heightInPixels, LEVELS.SCENE1.BACKGROUND)
            .setOrigin(0,0).setDepth(-1);

    }

    public update (): void {
        this.background.tilePositionY -= 0.4;
        this.background.tilePositionX += 0.4;
    }
}