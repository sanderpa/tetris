export default class Controller {
    constructor(game, view){
        this.game = game
        this.view = view
        this.paused = true
        this.interval = -1

        document.addEventListener('keydown', this.handleKeyDown.bind(this))
        
        this.view.renderStartScreen()
        this.startGame()
    }

    startGame() {
        const speed = 1000 - this.game.getState().level * 100

        this.interval = setInterval(() => {
            if (this.paused) { 
                return 
            }
            else if (this.game.getState().isGameOver) {
                return this.view.renderGameOver(this.game.getState())
            }
            else {
                this.game.movePieceDown()
                this.view.renderMainScreen(this.game.getState())
            }
        }, speed > 0 ? speed : 100)
    }

    destruct() {
        clearInterval(this.interval)
    }

    reset() {
        this.game.reset()
        this.destruct()
        this.startGame()
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 13:
                this.paused = !this.paused
                if (this.game.getState().isGameOver) {
                    this.reset()
                }
                else if (this.paused) this.view.renderPauseScreen()
                else this.view.renderMainScreen(this.game.getState())
                break
            case 37:
                if (this.paused) break
                this.game.movePieceLeft()
                this.view.renderMainScreen(this.game.getState())
                break
            case 38:
                if (this.paused) break
                this.game.rotatePiece()
                this.view.renderMainScreen(this.game.getState())
                break
            case 39:
                if (this.paused) break
                this.game.movePieceRight()
                this.view.renderMainScreen(this.game.getState())
                break
            case 40:
                if (this.paused) break
                this.game.movePieceDown()
                this.view.renderMainScreen(this.game.getState())
                break
        }
    }      
}