import { LEVELS, SCENES, PLAYER } from './constants';

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

        this.tileMapLayer.setCollisionByExclusion([-1]);

        this.background = this
            .add
            .tileSprite(0,0,this.tileMap.widthInPixels, this.tileMap.heightInPixels, LEVELS.SCENE1.BACKGROUND)
            .setOrigin(0,0).setDepth(-1);
    
        //Animaciones
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

        //Crear Jugador
        this.player = this.physics.add.sprite(80,80, PLAYER.ID).play(PLAYER.ANIM.IDLE, true);

        this.player.body.setSize(20,30);

        this.physics.add.collider(this.player, this.tileMapLayer); 

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.wasdKeys = this.input.keyboard.addKeys('W, A, S, D');
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    public update (): void {
        this.background.tilePositionY -= 0.4;
        this.background.tilePositionX += 0.4;

         //Control de Movimiento
         if (this.wasdKeys.A.isDown || this.cursorKeys.left.isDown){
            this.player.setVelocityX(-200);
            if(this.player.body.blocked.down) { this.player.anims.play(PLAYER.ANIM.RUN, true); }
            this.player.flipX = true; 
        }else if (this.wasdKeys.D.isDown || this.cursorKeys.right.isDown){
            this.player.setVelocityX(200);
            if(this.player.body.blocked.down) this.player.anims.play(PLAYER.ANIM.RUN, true);
            this.player.flipX = false; 

        } else {
            this.player.setVelocityX(0);
            this.player.anims.play(PLAYER.ANIM.IDLE, true);
        }

        if ((this.spaceBar.isDown || this.wasdKeys.W.isDown || this.cursorKeys.up.isDown) && this.player.body.blocked.down){
            this.player.setVelocityY(-300);
            this.player.anims.stop();
            this.player.setTexture(PLAYER.ID, PLAYER.ANIM.JUMP);
        }

    }
}