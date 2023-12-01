<template>
	<main class="main">
		<div class="overlay"></div>
		<Toast />
		<div class="page">
			<div class="page__container">
				<div class="page__content content">
					<h1 class="content__title">Узнать сколько времени прошло с даты</h1>
					<div class="content__inputs">
						<input type="date" v-model="date" @keydown.enter="count">
						<input type="time" v-model="time" @keydown.enter="count">
					</div>
					<div class="center">
						<Button label="Получить информацию" @click="count" class="p-button-lg remove-outline" />
					</div>
					<transition>
						<div v-if="res" class="result">
							<div class="result__text">С {{ date }} {{ time }} прошло {{ res }} // По московскому времени</div>
							<div class="center">
								<Button label="Очистить" @click="clear" severity="danger" class="remove-outline center" />
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { getEnding } from "../utils/getEnding"
export default {
	data() {
		const currentDate = new Date()
		return {
			date: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`,
			time: `12:12`,
			days: null,
			hours: null,
			minutes: null,
			res: null,
		}
	},
	methods: {
		clear() {
			this.hours = null
			this.minutes = null
			this.res = null
		},
		getCurrentMoscowTime() {
			const now = new Date()
			const offset = now.getTimezoneOffset()
			const moscowOffset = 180
			const moscowTime = new Date(now.getTime() + (moscowOffset + offset) * 60 * 1000)
			const hours = moscowTime.getHours().toString().padStart(2, '0')
			const minutes = moscowTime.getMinutes().toString().padStart(2, '0')
			return `${hours}:${minutes}`
		},
		count() {
			const selected = new Date(`${this.date}T${this.time}:00+03:00`)
			const result = new Date().getTime() - selected.getTime()

			if (result < 1) {
				this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректная дата', life: 3000 });
				return null
			}

			this.days = Math.floor(result / (1000 * 60 * 60 * 24))
			this.hours = Math.floor((result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			this.minutes = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60))

			const timeUnits = [
				{ unit: 'день', endings: ['дней', 'день', 'дня'] },
				{ unit: 'час', endings: ['часов', 'час', 'часа'] },
				{ unit: 'минута', endings: ['минут', 'минута', 'минуты'] },
			]

			const timeStrings = []
			if (this.days) {
				timeStrings.push(`${this.days} ${getEnding(this.days, timeUnits[0].endings)}`)
			}
			if (this.hours) {
				timeStrings.push(`${this.hours} ${getEnding(this.hours, timeUnits[1].endings)}`)
			}
			if (this.minutes) {
				timeStrings.push(`${this.minutes} ${getEnding(this.minutes, timeUnits[2].endings)}`)
			}
			const timeString = timeStrings.join(' ')
			this.res = timeString
		}
	}
}
</script>