<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    data: Object,
  },
  mounted () {
    this.data.datasets[0].backgroundColor = ['#f87979', '#aa4c8f', '#38b48b', '#006e54', '#c1e4e9', '#89c3eb', '#c3d825']
    this.renderChart(this.data,
      {
        responsive: true,
      })
  }
}
</script>