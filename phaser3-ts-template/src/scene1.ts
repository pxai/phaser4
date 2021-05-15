import { LEVELS, SCENES, OBJECTS, PLAYER } from './constants';
import Player from './player';

export default class Scene1 extends Phaser.Scene
{
    private width: number;
    private height: number;
    private points: number;

    private tileMap : Phaser.Tilemaps.Tilemap;
    private tileSet: Phaser.Tilemaps.Tileset;
    private tileMapLayer: Phaser.Tilemaps.TilemapLayer; 
    private background: Phaser.GameObjects.TileSprite;

    private player: Phaser.Physics.Arcade.Sprite;

    //Control de entrada
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasdKeys: any;
    private spaceBar: Phaser.Input.Keyboard.Key;

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
        this.physics.world.bounds.setTo(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);
        this.tileMapLayer.setCollisionByExclusion([-1]);

        this.background = this
            .add
            .tileSprite(0,0,this.tileMap.widthInPixels, this.tileMap.heightInPixels, LEVELS.SCENE1.BACKGROUND)
            .setOrigin(0,0).setDepth(-1);
    
        this.anims.create({
            key: PLAYER.ANIM.IDLE,
            frames:this.anims.generateFrameNames (PLAYER.ID,{prefix: PLAYER.ANIM.IDLE + '-',
            end:11}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: PLAYER.ANIM.RUN, 
            frames: this.anims.generateFrameNames(PLAYER.ID,{
                prefix:PLAYER.ANIM.RUN + '-',
                end:11 
            }), 
            frameRate:20, 
            repeat: -1
        });

        this.player = new Player({scene: this, x: 80, y: 80, texture: PLAYER.ID});         
        this.cameras.main.startFollow(this.player); 
        this.physics.add.collider(this.player, this.tileMapLayer);  
        this.cameras.main.setBounds(0, 0, this.tileMap.widthInPixels, this.tileMap.heightInPixels);

        let sampleObject: any = this.tileMap.createFromObjects("objectLayer", {name: "prize"})[0];                
        this.physics.world.enable(sampleObject);
        sampleObject.body.setAllowGravity(false);
        sampleObject.setTexture(OBJECTS.BOX);
        sampleObject.body.setSize(40,50);      
        
        //collisión para final del nivel
        this.physics.add.collider(this.player, sampleObject, () => {            
            console.log("EEEEND!");
        });
    }

    public update (): void {
        this.background.tilePositionY -= 0.4;
        this.background.tilePositionX += 0.4;
        this.player.update();
    }
}