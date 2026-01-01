# T5500 Health Monitoring Script
# Logs CPU, RAM, and Disk usage every 5 minutes
# Appends results to C:\AiCollabForTheKids\logs\t5500-health.log

$LogFile = "C:\AiCollabForTheKids\logs\t5500-health.log"

while ($true) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

    # CPU load
    $cpu = (Get-Counter '\Processor(_Total)\% Processor Time').CounterSamples.CookedValue

    # RAM usage
    $mem = Get-CimInstance Win32_OperatingSystem
    $totalMem = [math]::Round($mem.TotalVisibleMemorySize / 1KB, 2)
    $freeMem = [math]::Round($mem.FreePhysicalMemory / 1KB, 2)
    $usedMem = $totalMem - $freeMem

    # Disk usage (C:)
    $disk = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'"
    $totalDisk = [math]::Round($disk.Size / 1GB, 2)
    $freeDisk = [math]::Round($disk.FreeSpace / 1GB, 2)
    $usedDisk = $totalDisk - $freeDisk

    $entry = "$timestamp | CPU: {0:N2}% | RAM: {1}MB used / {2}MB total | Disk: {3}GB used / {4}GB total" -f $cpu, $usedMem, $totalMem, $usedDisk, $totalDisk

    Add-Content -Path $LogFile -Value $entry

    Start-Sleep -Seconds 300
}
