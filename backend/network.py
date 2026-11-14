class Network:
    def __init__(self):
        self.partitions = set()

    def disconnect(self, region: str):
        self.partitions.add(region)

    def reconnect(self, region: str):
        self.partitions.discard(region)

    def is_connected(self, region: str):
        return region not in self.partitions

    def status(self):
        return {
            "disconnected_regions": list(
                self.partitions
            ),
            "network_healthy": len(
                self.partitions
            ) == 0
        }