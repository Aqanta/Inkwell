<script>
export default {
  name: "helperFunctions",
  data() {
    return { /* data */ }
  },
  methods: {
    randomItem( list ) {
      return list[ this.randomInt( 0, list.length )];
    },
    randomInt( low, high ) {
      return Math.floor(Math.random() * (high - low) + low);
    }
  },

}
</script>
