<template>
	<main>
		<div class="overlay"></div>
		<div class="page">
			<div class="page__container">
				<div class="page__content content">
					<h1 class="content__title">Узнать сколько времени прошло с даты</h1>
					<div class="content__inputs">
						<input type="date" v-model="date" @keydown.enter="count">
						<input type="time" v-model="time" @keydown.enter="count">
					</div>
					<button class="content__btn" @click="count">Получить информацию</button>
					<div v-show="res" class="content__result">С {{ date }} {{ time }} прошло {{ res }} // По московскому времени</div>
					<button v-show="res" @click="clear" class="content__clear">Очистить</button>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	data() {
    const currentDate = new Date();
		return {
			date: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`,
			time: `12:12`,
			days: null,
			hours: null, 
			minutes: null,
			res: null,
		};
	},
	methods: {
		clear(){
			this.time = `12:12`
			this.days = null
			this.hours = null
			this.minutes = null
			this.res = null
		},
		getCurrentMoscowTime() {
			const now = new Date();
			const offset = now.getTimezoneOffset();
			const moscowOffset = 180; // московское время = UTC+3
			const moscowTime = new Date(now.getTime() + (moscowOffset + offset) * 60 * 1000);
			const hours = moscowTime.getHours().toString().padStart(2, '0');
			const minutes = moscowTime.getMinutes().toString().padStart(2, '0');
			return `${hours}:${minutes}`;
		},
		count(){
			const selected = new Date(`${this.date}T${this.time}:00+03:00`); // временная зона Москвы
			const result = new Date().getTime() - selected.getTime();
			this.days = Math.floor(result / (1000 * 60 * 60 * 24));
			this.hours = Math.floor((result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			this.minutes = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));

			const timeUnits = [
				{ unit: 'день', endings: ['дней', 'день', 'дня'] },
				{ unit: 'час', endings: ['часов', 'час', 'часа'] },
				{ unit: 'минута', endings: ['минут', 'минута', 'минуты'] },
			];
			function getEnding(number, endings) {
				const remainder = Math.abs(number) % 100;
				if (remainder >= 11 && remainder <= 19) {
				return endings[0];
				}
				const lastDigit = remainder % 10;
				if (lastDigit === 1) {
				return endings[1];
				}
				if (lastDigit >= 2 && lastDigit <= 4) {
				return endings[2];
				}
				return endings[0];
			}

			const timeStrings = [];
			if (this.days) {
				timeStrings.push(`${this.days} ${getEnding(this.days, timeUnits[0].endings)}`);
			}
			if (this.hours) {
				timeStrings.push(`${this.hours} ${getEnding(this.hours, timeUnits[1].endings)}`);
			}
			if (this.minutes) {
				timeStrings.push(`${this.minutes} ${getEnding(this.minutes, timeUnits[2].endings)}`);
			}
			const timeString = timeStrings.join(' ');
			this.res = timeString
		}
	}
}
</script>