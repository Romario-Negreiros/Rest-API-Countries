export default function insertCommaBetweenNumbers(numberCome) {
    let population = numberCome.toString()
    let l = population.length
    let part1 = '', part2 = '', part3 = '', part4 = '', resulting = ''
    switch (l) {
        case 4:
            part1 = population.slice(0, 1)
            part2 = population.slice(1, 4)
            resulting = part1 + ',' + part2
            break
        case 5:
            part1 = population.slice(0, 2)
            part2 = population.slice(2, 5)
            resulting = part1 + ',' + part2
            break
        case 6:
            part1 = population.slice(0, 3)
            part2 = population.slice(3, 6)
            resulting = part1 + ',' + part2
            break
        case 7:
            part1 = population.slice(0, 1)
            part2 = population.slice(1, 4)
            part3 = population.slice(4, 7)
            resulting = part1 + ',' + part2 + ',' + part3
            break
        case 8:
            part1 = population.slice(0, 2)
            part2 = population.slice(2, 5)
            part3 = population.slice(5, 8)
            resulting = part1 + ',' + part2 + ',' + part3
            break
        case 9:
            part1 = population.slice(0, 3)
            part2 = population.slice(3, 6)
            part3 = population.slice(6, 9)
            resulting = part1 + ',' + part2 + ',' + part3
            break
        case 10:
            part1 = population.slice(0, 1)
            part2 = population.slice(1, 4)
            part3 = population.slice(4, 7)
            part4 = population.slice(7, 10)
            resulting = part1 + ',' + part2 + ',' + part3 + ',' + part4
            break
    }
    return resulting
}