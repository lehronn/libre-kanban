$(function(){
	function Column(name) {
		var self = this; //for nested functions, context fix
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			//creating elements of column.
			//$ in variables mean jquery elements.
			var $column = $('<div>').addClass('column');
			$columnTitle = $('<h2>').addClass('column-title').text(self.name);
			$columnCardList = $('<ul>').addClass('column-card-list');
			$columnDelete = $('<button>').addClass('btn-delete btn-danger').text('x');
			$columnAddCard = $('<button>').addClass('add-card btn-success').text('Add a card');

			//adding events
			$columnDelete.click(function() {
				self.removeColumn();
			});
			//Add a note after clicking on the button:
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt('Enter the name of card')));
			});
			//construction column element
			$column.append($columnTitle)
						.append($columnDelete)
						.append($columnAddCard)
						.append($columnCardList);
			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			var $card = $('<li>').addClass('card');
			var	$cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete btn-danger').text('X');

			$cardDelete.click(function() {
				self.removeCard();
			});

			$card.append($cardDelete)
				.append($cardDescription);
				return $card;
			}
		}

		Card.prototype = {
			removeCard: function() {
				this.$element.remove();
			}
		};

		//board object in js (html structure insert to js)
		var board = {
			name: 'Kanban Board',
			addColumn: function(column) {
				this.$element.append(column.$element);
				initSortable();
			},
			$element: $('#board .column-container')
		};

		function initSortable() {
			$('.column-card-list').sortable({
				connectWith: '.column-card-list',
				placeholder: 'card-placeholder'
			}).disableSelection();
		}

		$('.create-column')
		.click(function(){
			var name = prompt('Enter a column name.');
			var column = new Column(name);
					board.addColumn(column);
		});

		function randomString() {
			var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ',
					str = '';
			for (i = 0; i<10; i++) {
				str += chars[Math.floor(Math.random() * chars.length)];
			}
			return str;
		}

		// TWORZENIE KOLUMN
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// TWORZENIE NOWYCH EGZEMPLARZY KART
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// DODAWANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);

});
