<template>
	<TheHeader />
	<TheMain />
	<TheFooter />
</template>
<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import TheMain from '../components/TheMain.vue';
export default {
	components: {
		TheHeader, TheFooter, TheMain
	},
}
</script>