export default class Game {
    score = 0
    lines = 0
    level = 0
    playfield = this.createPlayfield()
    activePiece = {
        x: 0,
        y: 0,
        blocks: [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ]
    }

    createPlayfield() {
        const playfield = []

        for (let y = 0; y < 20; y++) {
            playfield[y] = []

            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0
            }     
        }

        return playfield
    }

    isPieceOnRightPlace () {
        const {y: pieceY, x: pieceX, blocks} = this.activePiece

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (
                    blocks[y][x] && 
                    ((this.playfield[pieceY+y] === undefined || this.playfield[pieceY+y][pieceX+x] === undefined) || this.playfield[pieceY+y][pieceX+x])
                    ) {
                        return true
                    }
            }
        }
        return false
    }

    movePieceLeft () {
        this.activePiece.x -= 1

        if (this.isPieceOnRightPlace()) {
            this.activePiece.x += 1
        }
    }

    movePieceRight () {
        this.activePiece.x += 1

        if (this.isPieceOnRightPlace()) {
            this.activePiece.x -= 1
        }
    }

    movePieceDown() {
        this.activePiece.y += 1

        if (this.isPieceOnRightPlace()) {
            this.activePiece.y -= 1
        }
    }

    rotatePiece() {
        const blocks = this.activePiece.blocks
        const length = blocks.length

        const temp = []
        for (let i = 0; i < length; i++) {
            temp[i] = new Array(length).fill(0)
        }
        
        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                temp[x][y] = blocks[length - 1 - y][x]
            }
        }

        this.activePiece.blocks = temp

        if (this.isPieceOnRightPlace()) {
            this.activePiece.blocks = blocks
        }
    }

    lockPiece() {
        const {y: pieceY, x: pieceX, blocks} = this.activePiece

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    this.playfield[pieceY+y][pieceX+x]= blocks[y][x]
                }
            }
        }
    }
    
    getState() {
        const playfield = this.createPlayfield()
        const {y: pieceY, x: pieceX, blocks} = this.activePiece

        for (let y = 0; y < this.playfield.length; y++) {
            playfield[y] = [];

            for (let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x]
            }
        }

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playfield[pieceY + y][pieceX + x] = blocks[y][x]
                }             
            }   
        }

        return {playfield}
    }
} 