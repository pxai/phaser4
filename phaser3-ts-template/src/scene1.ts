export default class Scene1 extends Phaser.Scene
{
    private width: number;
    private height: number;
    private points: number;

    private tileMap : Phaser.Tilemaps.Tilemap;
    private tileSet: Phaser.Tilemaps.Tileset;
    private tileMapLayer: Phaser.Tilemaps.TilemapLayer; 

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

        this.tileMap = this.make.tilemap({ key: 'scene1' , tileWidth: 16, tileHeight: 16 });
        
        this.tileSet = this.tileMap.addTilesetImage('tileset');
        
        this.tileMapLayer = this.tileMap.createLayer('Scene1Layer', this.tileSet);
       
    }
}