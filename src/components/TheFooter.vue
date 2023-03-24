<template>
	<footer class="footer">
		<div class="footer__container">
			<div class="footer__media">
				<a href="https://vk.com/a.kulchitskiy" target="_blank" class="media__link"><img src="/vk.svg" alt="VK"></a>
			</div>
			<div class="footer__copy">
				Copyright ©{{ year }} All rights reserved
			</div>
		</div>
	</footer>
</template>
<script>
export default {
	computed: {
		year(){
			const currentDate = new Date();
			return currentDate.getFullYear()
		}
	}
}
</script>