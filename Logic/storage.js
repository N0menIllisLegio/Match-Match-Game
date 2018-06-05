if (localStorage.getItem('Player1NickEasy') == null)
{
	let PlayerCounter = 1;

	let PlayersNickArray = new Array('0', 'Hetza Hellshock', 'Mason Kernigann', 'Victor The Great', 'John John', 'Jason Brody', 'Rodrigez Dead', 'Alexey Sidorov', 'Alisa Dvachevskaya', 'Kurumi Tokisaki', 'Duke Nukem');
	let PlayersTimeArray = new Array('0', '30', '40', '45', '50', '55', '60', '65', '70', '75', '80');

	while (PlayerCounter < 11)
	{
		localStorage.setItem(`Player${PlayerCounter}NickHard`, PlayersNickArray[PlayerCounter]);
		localStorage.setItem(`Player${PlayerCounter}TimeHard`, PlayersTimeArray[PlayerCounter]  * 4);

		localStorage.setItem(`Player${PlayerCounter}NickMedium`, PlayersNickArray[PlayerCounter]);
		localStorage.setItem(`Player${PlayerCounter}TimeMedium`, PlayersTimeArray[PlayerCounter] * 2.5);

		localStorage.setItem(`Player${PlayerCounter}NickEasy`, PlayersNickArray[PlayerCounter]);
		localStorage.setItem(`Player${PlayerCounter}TimeEasy`, PlayersTimeArray[PlayerCounter]);

		PlayerCounter++;
	}
}