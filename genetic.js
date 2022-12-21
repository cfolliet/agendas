// genetic algo from chatGPT

// Define the genetic algorithm function
function geneticAlgorithm(population, fitnessFunction) {
    // Initialize the current generation
    let generation = 0;
  
    // Evaluate the fitness of each individual in the population
    let populationFitness = population.map(fitnessFunction);
  
    // Run the genetic algorithm until some termination condition is met
    while (generation < maxGenerations) {
      // Select the fittest individuals for breeding
      let matingPool = selectFittest(population, populationFitness, poolSize);
  
      // Breed the next generation
      let offspring = breed(matingPool);
  
      // Evaluate the fitness of the offspring
      let offspringFitness = offspring.map(fitnessFunction);
  
      // Replace the weakest individuals with the fittest offspring
      population = replaceWeakest(population, populationFitness, offspring, offspringFitness);
      populationFitness = population.map(fitnessFunction);
  
      // Increment the generation counter
      generation++;
    }
  
    // Return the fittest individual in the final population
    return population[0];
  }
  
  // Define the selection function to choose fittest individuals for breeding
  function selectFittest(population, fitness, poolSize) {
    // Sort the population by fitness
    let populationAndFitness = population.map((individual, index) => ({ individual, fitness: fitness[index] }));
    populationAndFitness.sort((a, b) => b.fitness - a.fitness);
  
    // Select the top individuals from the sorted population
    return populationAndFitness.slice(0, poolSize).map(({ individual }) => individual);
  }
  
  // Define the breeding function to produce offspring from a mating pool
  function breed(matingPool) {
    // Initialize the offspring array
    let offspring = [];
  
    // Breed the offspring
    while (offspring.length < populationSize) {
      // Select two parents at random from the mating pool
      let parent1 = matingPool[Math.floor(Math.random() * matingPool.length)];
      let parent2 = matingPool[Math.floor(Math.random() * matingPool.length)];
  
      // Crossover the parents to produce offspring
      let child = crossover(parent1, parent2);
  
      // Mutate the offspring
      child = mutate(child);
  
      // Add the offspring to the next generation
      offspring.push(child);
    }
  
    return offspring;
  }
  
  // Define the crossover function to combine the genetic information of two parents
  function crossover(parent1, parent2) {
    // Initialize the child as an empty array
    let child = [];
  
    // Crossover the parents to produce the child
    for (let i = 0; i < parent1.length; i++) {
      // Choose either the gene from parent1 or parent2 at random
      let gene = Math.random() < 0.5 ? parent1[i] : parent2[i];
      child.push(gene);
    }
  
    return child;
  }
  
  function mutate(individual) {
    // Iterate over the individual's genes
    for (let i = 0; i < individual.length; i++) {
      // Mutate the gene with a certain probability
      if (Math.random() < mutationRate) {
        // Generate a random new value for the gene
        individual[i] = Math.random();
      }
    }
  
    return individual;
  }
    
  function replaceWeakest(population, fitness, offspring, offspringFitness) {
    // Combine the population and the offspring into a single array
    let combined = population.concat(offspring);
    let combinedFitness = fitness.concat(offspringFitness);
  
    // Sort the combined array by fitness
    let combinedAndFitness = combined.map((individual, index) => ({ individual, fitness: combinedFitness[index] }));
    combinedAndFitness.sort((a, b) => a.fitness - b.fitness);
  
    // Return the fittest individuals from the combined array
    return combinedAndFitness.slice(0, population.length).map(({ individual }) => individual);
  }
  