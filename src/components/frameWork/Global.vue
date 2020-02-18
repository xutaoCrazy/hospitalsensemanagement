<script>

let baseUrl = location.origin

if (location.hostname === 'localhost' || location.hostname === '192.168.1.166') {
  baseUrl = '/api'
}
export default {
  baseUrl
}
</script>
