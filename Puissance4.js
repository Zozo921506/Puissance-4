export class Puissance4 
{
    constructor(width = 7, height = 6) 
    {
        this.width = width;
        this.height = height;
        if (width < 4 || height < 4) 
        {
            alert("There is not enough space to play. Please provide dimensions of at least 4x4.");
            this.width = 7;
            this.height = 6;
        }
        let turn = [this.player1, this.player2];
        this.currentPlayer = Math.floor(Math.random() * turn.length);
    }

    grille() 
    {
        let grille = document.getElementById('game');
        let grid = document.createElement('table');
        grid.setAttribute('id', 'table');
        grille.appendChild(grid);
        for (let i = 0; i < this.height; i++) 
        {
            let row = document.createElement('tr');
            for (let j = 0; j < this.width; j++) 
            {
                let col = document.createElement('td');
                col.addEventListener('click', () => this.onClick(j));
                row.appendChild(col);
                col.dataset.column = j;
            }
            grid.appendChild(row);
        }
    }

    players(player1 = "Player 1", player2 = "Player 2", color1 = "red", color2 = "yellow") 
    {
        this.player1 = player1;
        this.player2 = player2;
        this.color1 = color1;
        this.color2 = color2;
        if (this.color1 === this.color2) 
        {
            alert("The two players have the same colors. Please provide different colors.");
            this.color1 = "red";
            this.color2 = "yellow";
        }

        // Visual of players and the turn of the player
        let grille = document.getElementById('game');
        let div = document.createElement('div');
        let player = document.createElement('h2');
        let J1 = document.createElement('h3');
        let J2 = document.createElement('h3');
        player.textContent = "Players:";
        J1.textContent = this.player1;
        J1.style.color = this.color1;
        J1.style.textAlign = "center";
        J1.style.border = "thin solid";
        J2.style.color = this.color2;
        J2.style.textAlign = "center";
        J2.style.border = "thin solid";
        J2.textContent = this.player2;
        player.className = "player";
        J1.className = "player";
        J2.className = "player";
        grille.appendChild(div);
        div.appendChild(player);
        div.appendChild(J1);
        div.appendChild(J2);

        // Turn part
        this.turnIndicator = document.createElement('h4');
        this.updateTurnIndicator();
        div.appendChild(this.turnIndicator);
        let resetButton = document.createElement('button');
        resetButton.textContent = 'Restart';
        resetButton.addEventListener('click', () => this.resetGame());
        div.appendChild(resetButton);
    }

    onClick(column) 
    {
        let targetColumn = document.querySelectorAll('td[data-column="' + column + '"]');
        for (let i = targetColumn.length - 1; i >= 0; i--) {
            if (!targetColumn[i].style.backgroundColor) 
            {
                if (this.currentPlayer === 0) 
                {
                    targetColumn[i].style.backgroundColor = this.color1;
                    targetColumn[i].classList.add('animation');
                    this.currentPlayer = 1;
                } else 
                {
                    targetColumn[i].style.backgroundColor = this.color2;
                    targetColumn[i].classList.add('animation');
                    this.currentPlayer = 0;
                }
                break;
            }
        }
        this.updateTurnIndicator();
        this.win();
    }

    updateTurnIndicator() 
    {
        if (this.currentPlayer === 0) 
        {
            this.turnIndicator.textContent = this.player1 + "'s turn";
            this.turnIndicator.style.color = this.color1;
        } 
        else 
        {
            this.turnIndicator.textContent = this.player2 + "'s turn";
            this.turnIndicator.style.color = this.color2;
        }
    }

    win() 
    {
        // Vertical
        let table = document.getElementById('table');
        for (let col = 0; col < this.width; col++) 
        {
            let c = 0;
            let previousColor = null;
            for (let row = 0; row < this.height; row++) 
            {
                let cell = table.rows[row].cells[col];
                let currentColor = cell.style.backgroundColor;
                if (currentColor === previousColor && currentColor !== '') 
                {
                    c ++;
                    if (c >= 4) 
                    {
                        this.declareWinner(this.currentPlayer === 0 ? this.player2 : this.player1);
                        return true;
                    }
                } 
                else 
                {
                    c = 1;
                    previousColor = currentColor;
                }
            }
        }

        // Horizontal
        for (let row = 0; row < this.height; row++) 
        {
            let c = 0;
            let previousColor = null;
            for (let col = 0; col < this.width; col++) 
            {
                let cell = table.rows[row].cells[col];
                let currentColor = cell.style.backgroundColor;
                if (currentColor === previousColor && currentColor !== '') 
                {
                    c++;
                    if (c >= 4) 
                    {
                        this.declareWinner(this.currentPlayer === 0 ? this.player2 : this.player1);
                        return true;
                    }
                } 
                else 
                {
                    c = 1;
                    previousColor = currentColor;
                }
            }
        }

        // Diagonal left to right
        for (let col = 0; col < this.width - 3; col++) 
        {
            for (let row = 0; row < this.height - 3; row++) 
            {
                let color = table.rows[row].cells[col].style.backgroundColor;
                if (color && color === table.rows[row + 1].cells[col + 1].style.backgroundColor && color === table.rows[row + 2].cells[col + 2].style.backgroundColor && color === table.rows[row + 3].cells[col + 3].style.backgroundColor) 
                {
                    this.declareWinner(this.currentPlayer === 0 ? this.player2 : this.player1);
                    return true;
                }
            }
        }

        // Diagonal right to left
        for (let col = this.width - 1; col >= 3; col--) 
        {
            for (let row = 0; row < this.height - 3; row++) 
            {
                let color = table.rows[row].cells[col].style.backgroundColor;
                if (color && color === table.rows[row + 1].cells[col - 1].style.backgroundColor && color === table.rows[row + 2].cells[col - 2].style.backgroundColor && color === table.rows[row + 3].cells[col - 3].style.backgroundColor) 
                {
                    this.declareWinner(this.currentPlayer === 0 ? this.player2 : this.player1);
                    return true;
                }
            }
        }
        return false;
    }

    // This method is only for the visual
    declareWinner(winner) 
    {
        let div = document.createElement('div');
        div.textContent = winner + " wins!";
        div.className = "winner";
        div.style.color = (winner === this.player1 ? this.color1 : this.color2);
        document.getElementById('game').appendChild(div);
    }

    resetGame() 
    {
        let cells = document.querySelectorAll('#table td');
        cells.forEach(cell => 
        {
            cell.style.backgroundColor = '';
        });
    
        let turn = [this.player1, this.player2];
        this.currentPlayer = Math.floor(Math.random() * turn.length);
    }
    
}
