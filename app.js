document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const ScoreDisplay = document.querySelector('#score')
    const StartBtn = document.querySelector('#start-button')
    const width = 10

    //the tertrominoes shape
    //starting with the L-shape
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    //the o-block
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    //the t-block
    const tTetromino = [
        [1,width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    //I-tetromino
    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    //z-Tetromino
    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const theTetrominoes = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino]

    let currentPosition = 4
    let currentRotation = 0

    console.log(theTetrominoes[0][0])

    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]

    //draw the first rotation in the first tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    //undraw the tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }
    //make the teromino move down every second
    timerId = setInterval(moveDown, 1000)

    //assign function to keyCodes
    function control(e) {
        if(e.keyCode ===37) {
            moveLeft()
        } else if (e.keyCode === 38){
            rotate()
        } else if (e.keyCode === 39){ 
            moveRight()
        } else if (e.keyCode === 40){
            moveDown()
        }
    }
    document.addEventListener('keyup', control)
    //move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling
            random = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4 
            draw()
        }
    }

    //move the tetronimo left, unless is on the edge of the block
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => ((currentPosition + index) % width === 0))
        
        if(!isAtLeftEdge) currentPosition -= 1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }

        draw()

    }

    //move tetromino to the right, unless at edge
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index)% width === width - 1)

        if (!isAtRightEdge) currentPosition += 1

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }

        draw()
    }

    //rotate the tetromino
    function rotate() {
        undraw()
        currentRotation ++

        if(currentRotation == current.length) { // if rotation gets to 4, reset it to 0
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }










})

